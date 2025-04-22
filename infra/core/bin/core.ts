#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import type { Table } from "aws-cdk-lib/aws-dynamodb";
import { AuthStack } from "../lib/cognito/auth";
import { AppSyncStack } from "../lib/data/appsync/appsycn";
import { S3Stack } from "../lib/storage/s3";
import { LambdaFunctionConstruct } from "../lib/functions";
import { QueueConstruct } from "../lib/queues";
import path = require("node:path");

interface AppConfig {
  appName: string;
  envName: string;
  region?: string;
}

// Function declarations (hoistable)
function getLambdaEnvironment(dataStack: AppSyncStack, storageStack: S3Stack) {
  return {
    DOCUMENT_BUCKET: storageStack.bucket.bucketName,
    GRAPHQL_KEY: dataStack.graphQlApi.apiKey ?? "null",
    GRAPHQL_API_ID: dataStack.graphQlApi.apiId,
    GRAPHQL_URL: dataStack.graphQlApi.graphqlUrl,
  };
}

function configureLambdaPermissions(
  lambda: LambdaFunctionConstruct,
  storageStack: S3Stack,
  dataStack: AppSyncStack
) {
  storageStack.bucket.grantRead(lambda.lambdaFunction);
  const { graphqlApi } = dataStack.graphQlApi.resources;
  graphqlApi.grantMutation(lambda.lambdaFunction);
  graphqlApi.grantQuery(lambda.lambdaFunction);
}

function configureApplication() {
  const appConfig: AppConfig = {
    appName: "AltScore",
    envName: process.env.stage ?? "dev",
    region: process.env.CDK_DEFAULT_REGION,
  };

  const app = new App();
  
  // Infrastructure Stacks
  const authStack = new AuthStack(app, `${appConfig.appName}-AuthStack`, appConfig);
  const dataStack = new AppSyncStack(app, `${appConfig.appName}-AppSyncStack`, {
    ...appConfig,
    userPoolId: authStack.userPool.userPoolId,
  });
  const storageStack = new S3Stack(app, `${appConfig.appName}-S3Stack`, appConfig);
  const documentsQueue = new QueueConstruct(app, `${appConfig.appName}-QueueStack`, {
    isFifo: false,
    timeoutSeconds: 900,
  });

  // Configure permissions
  const { authenticatedRole } = authStack.identityPool;
  storageStack.bucket.grantReadWrite(authenticatedRole);
  storageStack.bucket.grantPut(authenticatedRole);

  // Lambda Configuration
  const models = ["Document"];
  const schedulerTables = models.map(
    (model) => dataStack.graphQlApi.resources.tables[model] as Table
  );

  const documentScheduler = new LambdaFunctionConstruct(
    app,
    `${appConfig.appName}-DocumentScheduler`,
    {
      ...appConfig,
      functionName: "Documents-Scheduler",
      timeoutSeconds: 900,
      memorySize: 1024,
      subscriptions: schedulerTables,
      queues: [documentsQueue.queue],
      runtime: Runtime.NODEJS_22_X,
      sourcePath: path.join(__dirname, "../../../functions/document-scheduler/dist"),
      handler: "index.handler",
      envs: getLambdaEnvironment(dataStack, storageStack),
    }
  );

  configureLambdaPermissions(documentScheduler, storageStack, dataStack);
}

// Bootstrap application
configureApplication(); 