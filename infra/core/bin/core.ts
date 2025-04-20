#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { AuthStack, type AuthStackProps } from "../lib/cognito/auth";
import { AppSyncStack } from "../lib/data/appsync/appsycn";
const appConfigs: AuthStackProps = {
	appName: "AltScore",
	envName: process?.env?.stage ?? "dev",
};
const AltScoreApp = new App();
const authStack = new AuthStack(
	AltScoreApp,
	`${appConfigs.appName}-AuthStack`,
	{
		...appConfigs,
	},
);

const dataStack = new AppSyncStack(
	AltScoreApp,
	`${appConfigs.appName}-AppSycnStack`,
	{
		...appConfigs,
		userPoolId: authStack.userPool.userPoolId,
	},
);
