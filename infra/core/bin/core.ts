#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { AuthStack, type AuthStackProps } from "../lib/cognito/auth";

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
