// bin/alt-score.ts
import { App } from "aws-cdk-lib";
import { AuthStack } from "../lib/cognito/auth";
import { AppSyncStack } from "../lib/data/appsync/appsycn";
import { LambdaStack } from "../lib/functions";
import { QueueConstruct } from "../lib/queues";
import { S3Stack } from "../lib/storage/s3";
import type { AppConfig } from "./utils";

const app = new App();
const env: AppConfig = {
	stage: process.env.stage ?? "dev",
	region: process?.env?.CDK_DEFAULT_REGION ?? "us-east-1",
	appName: "AltScore",
	envName: "dev",
};

const auth = new AuthStack(app, `${env.appName}-AuthStack`, env);
const data = new AppSyncStack(app, `${env.appName}-AppSyncStack`, {
	...env,
	userPoolId: auth.userPool.userPoolId,
});
const storage = new S3Stack(app, `${env.appName}-S3Stack`, env);
const { authenticatedRole } = auth.identityPool;
storage.bucket.grantReadWrite(authenticatedRole);
storage.bucket.grantPut(authenticatedRole);
const queue = new QueueConstruct(app, `${env.appName}-QueueStack`, {
	isFifo: false,
	timeoutSeconds: 900,
});

new LambdaStack(app, `${env.appName}-LambdaStack`, {
	...env,
	userPool: auth.userPool,
	api: data.api,
	bucket: storage.bucket,
	tables: [data.documentsTable],
	queues: [queue.queue],
});
