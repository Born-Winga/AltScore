#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { AuthStack} from "../lib/cognito/auth";
import { AppSyncStack } from "../lib/data/appsync/appsycn";
import { S3Stack } from "../lib/storage/s3";
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

const storageStack = new S3Stack(AltScoreApp, `${appConfigs.appName}-S3Stack`, {
	...appConfigs
})
storageStack.bucket.grantReadWrite(authenticatedRole);
storageStack.bucket.grantPut(authenticatedRole)

