#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { AuthStack } from "../lib/cognito/auth";
import { AppSyncStack } from "../lib/data/appsync/appsycn";
import { S3Stack } from "../lib/storage/s3";
import { LambdaFunctionConstruct } from "../lib/functions";
import { QueueConstruct } from "../lib/queues";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import path = require("node:path");
import type { Table } from "aws-cdk-lib/aws-dynamodb";
const appConfigs = {
	appName: "AltScore",
	envName: process?.env?.stage ?? "dev",
}
const AltScoreApp = new App();
const authStack = new AuthStack(
	AltScoreApp,
	`${appConfigs.appName}-AuthStack`,
	{
		...appConfigs,
	},
);

const authenticatedRole = authStack.identityPool.authenticatedRole

const dataStack = new AppSyncStack(
	AltScoreApp,
	`${appConfigs.appName}-AppSycnStack`,
	{
		...appConfigs,
		userPoolId: authStack.userPool.userPoolId,
	},
);

const appsyncTables = dataStack.graphQlApi.resources.tables

const storageStack = new S3Stack(AltScoreApp, `${appConfigs.appName}-S3Stack`, {
	...appConfigs
})
storageStack.bucket.grantReadWrite(authenticatedRole);
storageStack.bucket.grantPut(authenticatedRole)

const documentsQueue = new QueueConstruct(AltScoreApp, "score-doc-queue", {
	isFifo: false,
	timeoutSeconds: 900,
});

const models = ["Document"];
const schedulerTables = models.map((model) => appsyncTables[`${model}`] as Table);
const documentScheduler = new LambdaFunctionConstruct(
	AltScoreApp,
	`${appConfigs.appName}-Documents-Scheduler`,
	{
		functionName: `${appConfigs.appName}-Documents-Scheduler`,
		timeoutSeconds: 900,
		memorySize: 1024,
		subscriptions: schedulerTables,
		queues: [documentsQueue.queue],
		runtime: Runtime.NODEJS_22_X,
		sourcePath: path.join(__dirname, "../../../functions/document-scheduler/dist"),
		handler: "index.handler",
		envs: {
			DOCUMENT_BUCKET: storageStack.bucket.bucketName,
			GRAPHQL_KEY: dataStack?.graphQlApi.apiKey ?? "null",
			GRAPHQL_API_ID: dataStack?.graphQlApi.apiId,
			GRAPHQL_URL: dataStack?.graphQlApi.graphqlUrl
		},
	},
);

storageStack.bucket.grantRead(documentScheduler.lambdaFunction);
dataStack?.graphQlApi.resources.graphqlApi.grantMutation(
	documentScheduler.lambdaFunction,
);
dataStack?.graphQlApi.resources.graphqlApi.grantQuery(documentScheduler.lambdaFunction);


