#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { AuthStack, type AuthStackProps } from "../lib/cognito/auth";
// import { ITable } from "aws-cdk-lib/aws-dynamodb";
// import { AppSyncStack } from "../lib/data/appsync/appsycn";

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

// const dataSatack = new AppSyncStack(
// 	AltScoreApp,
// 	`${appConfigs.appName}-AppSycnStack`,
// 	{
// 		...appConfigs,
// 		userPoolId: authStack.userPool.userPoolId,
// 	},
// );

// const tables = dataSatack.graphQlApi.resources.tables
// // biome-ignore lint/complexity/useLiteralKeys: <explanation>
// console.log("Blog Table",(tables["Blog"]).tableArn)
