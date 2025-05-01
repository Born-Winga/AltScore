// lib/lambda/lambda-stack.ts
import { Aws, Duration, Stack, type StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";
import type { Function } from "aws-cdk-lib/aws-lambda";
import { type UserPool, UserPoolOperation } from "aws-cdk-lib/aws-cognito";
import type { GraphqlApi } from "aws-cdk-lib/aws-appsync";
import type { Bucket } from "aws-cdk-lib/aws-s3";
import type { Queue } from "aws-cdk-lib/aws-sqs";

import { DockerLambdaConstruct, LambdaFunctionConstruct } from "./constructs";
import type { Table } from "aws-cdk-lib/aws-dynamodb";
import type { AppConfig } from "../../bin/utils";
import path = require("node:path");
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

export interface LambdaStackProps extends StackProps, AppConfig {
	userPool: UserPool;
	api: GraphqlApi;
	bucket: Bucket;
	tables: [Table];
	docsQueues: Queue;
}

export class LambdaStack extends Stack {
	public readonly statementsFn: Function;
	constructor(scope: Construct, id: string, props: LambdaStackProps) {
		super(scope, id, props);

		const ssmPolicy = new PolicyStatement({
			effect: Effect.ALLOW,
			actions: [
				"ssm:GetParameter", // Corrected action
				"secretsmanager:GetSecretValue",
				"kms:Decrypt",
			],
			resources: [
				// Replace with your actual parameter ARNs
				`arn:aws:ssm:${Aws.REGION}:${Aws.ACCOUNT_ID}:parameter/appsync/api-url`,
				`arn:aws:ssm:${Aws.REGION}:${Aws.ACCOUNT_ID}:parameter/appsync/api-id`,
				// Add other parameters if needed
			],
		});

		const sqsPolicy = new PolicyStatement({
			effect: Effect.ALLOW,
			actions: ["sqs:*"],
			resources: [props.docsQueues.queueArn],
		});

		// Post-confirmation Lambda & trigger
		const postFn = new LambdaFunctionConstruct(this, "PostConfirmationFn", {
			functionName: "PostConfirmation",
			appName: props.appName,
			envName: props.envName,
			sourcePath: path.join(
				__dirname,
				"../../../../functions/post-confirmation/dist",
			),
		});

		props.userPool.addTrigger(
			UserPoolOperation.POST_CONFIRMATION,
			postFn.lambdaFunction,
		);
		const postFnLambdaRole = postFn.lambdaFunction.role;

		if (postFnLambdaRole) {
			const apiArnWildcard = `arn:aws:appsync:${Aws.REGION}:${Aws.ACCOUNT_ID}:apis/*`;

			postFnLambdaRole.addToPrincipalPolicy(
				new PolicyStatement({
					actions: ["appsync:*"],
					resources: [apiArnWildcard],
				}),
			);
			postFnLambdaRole.addToPrincipalPolicy(ssmPolicy);

			if (props.docsQueues) {
				console.log(props.docsQueues.queueArn);
				postFnLambdaRole.addToPrincipalPolicy(sqsPolicy);
			}
		}

		// Document Scheduler Lambda
		const docFn = new LambdaFunctionConstruct(this, "DocumentSchedulerFn", {
			functionName: "DocumentsScheduler",
			subscriptions: props.tables,
			envs: {
				DOCUMENT_BUCKET: props.bucket.bucketName,
				GRAPHQL_KEY: props.api.apiKey ?? "null",
				GRAPHQL_API_ID: props.api.apiId,
				GRAPHQL_URL: props.api.graphqlUrl,
				QUEUE_ARN: props?.docsQueues?.queueArn ?? null,
				QUEUE_NAME: props?.docsQueues?.queueName ?? null,
				QUEUE_URL: props?.docsQueues?.queueUrl ?? null,
			},
			timeoutSeconds: 900,
			memorySize: 2048,
			appName: props.appName,
			envName: props.envName,
			sourcePath: path.join(
				__dirname,
				"../../../../functions/document-scheduler/dist",
			),
		});
		const docFnRole = docFn.lambdaFunction.role;
		if (docFnRole) {
			docFnRole.addToPrincipalPolicy(ssmPolicy);
		}
		props.bucket.grantRead(docFn.lambdaFunction);
		props.api.grantQuery(docFn.lambdaFunction);
		props.api.grantMutation(docFn.lambdaFunction);
		if (props?.docsQueues) {
			props?.docsQueues.grantSendMessages(docFn.lambdaFunction);
		}
		const statementFn = new DockerLambdaConstruct(
			this,
			"StatementsProcessorFn",
			{
				functionName: "StatementsProcessor",
				subscriptions: [],
				queues: [props?.docsQueues],
				envs: {
					DOCUMENT_BUCKET: props.bucket.bucketName,
					GRAPHQL_KEY: props.api.apiKey ?? "null",
					GRAPHQL_API_ID: props.api.apiId,
					GRAPHQL_URL: props.api.graphqlUrl,
					QUEUE_ARN: props?.docsQueues?.queueArn ?? null,
					QUEUE_NAME: props?.docsQueues?.queueName ?? null,
					QUEUE_URL: props?.docsQueues?.queueUrl ?? null,
				},
				timeoutSeconds: 900,
				appName: props.appName,
				envName: props.envName,
				sourcePath: path.join(
					__dirname,
					"../../../../functions/statements-processor",
				),
				memorySize: 2048
			},
		);

		const statementFnRole = statementFn.lambdaFunction.role;
		if (statementFnRole) {
			const apiArnWildcard = `arn:aws:appsync:${Aws.REGION}:${Aws.ACCOUNT_ID}:apis/*`;
			statementFnRole.addToPrincipalPolicy(
				new PolicyStatement({
					actions: ["appsync:*"],
					resources: [apiArnWildcard],
				}),
			);
			statementFnRole.addToPrincipalPolicy(ssmPolicy);
		}
		props.bucket.grantRead(statementFn.lambdaFunction);
		props.api.grantQuery(statementFn.lambdaFunction);
		props.api.grantMutation(statementFn.lambdaFunction);

		this.statementsFn = statementFn.lambdaFunction;
	}
}
