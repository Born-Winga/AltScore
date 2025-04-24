import type { Construct } from "constructs";
import {
	DockerImageFunction,
	DockerImageCode,
	Architecture,
	Function,
	Code,
	Runtime,
	StartingPosition,
	MetricType,
} from "aws-cdk-lib/aws-lambda";
import { Duration, Stack } from "aws-cdk-lib";
import type { PolicyStatement } from "aws-cdk-lib/aws-iam";
import type { Table } from "aws-cdk-lib/aws-dynamodb";
import type { Queue } from "aws-cdk-lib/aws-sqs";
import {
	DynamoEventSource,
	SqsEventSource,
} from "aws-cdk-lib/aws-lambda-event-sources";

interface BaseFunctionConstructProps {
	functionName: string;
	timeoutSeconds?: number;
	memorySize?: number;
	policyStatements?: PolicyStatement[];
	subscriptions?: Table[];
	envs?: Record<string, string>;
	queues?: [Queue];
	appName: string;
	envName: string;
}

interface RegularLambdaConstructProps extends BaseFunctionConstructProps {
	sourcePath: string;
	runtime?: Runtime;
	handler?: string;
}

interface DockerLambdaConstructProps extends BaseFunctionConstructProps {
	sourcePath: string;
	architecture?: Architecture;
}

abstract class BaseLambdaConstruct extends Stack {
	public readonly lambdaFunction: Function | DockerImageFunction;
	protected readonly props: BaseFunctionConstructProps;

	constructor(scope: Construct, id: string, props: BaseFunctionConstructProps) {
		super(scope, id);
		this.props = props;

		this.validateDynamoSubscriptions();
		this.lambdaFunction = this.createLambdaFunction();
		this.configureLambda();
	}

	// Abstract method that subclasses will implement to create the specific Lambda type
	protected abstract createLambdaFunction(): Function | DockerImageFunction;

	// Helper function to validate DynamoDB table stream
	protected validateDynamoSubscriptions() {
		for (const table of this.props.subscriptions ?? []) {
			if (!table.tableStreamArn) {
				throw new Error(
					`DynamoDB table ${table.tableName} must have a stream enabled.`,
				);
			}
		}
	}

	// Helper function to generate resource name
	protected resourceName(suffix?: string): string {
		return `${this.props.appName}-${this.props.envName}-${this.props.functionName}${suffix ? `-${suffix}` : ""}`;
	}

	// Common Lambda function configuration: environments, policies, and event sources
	protected configureLambda() {
		this.addEnvironments();
		this.addPolicies();
		this.addEventSources();
	}

	private addEnvironments() {
		Object.entries(this.props.envs ?? {}).forEach(([key, value]) => {
			this.lambdaFunction.addEnvironment(key, value);
		});
	}

	private addPolicies() {
		this.props.policyStatements?.forEach((statement) => {
			this.lambdaFunction.addToRolePolicy(statement);
		});
	}

	private addEventSources() {
		this.props.queues?.forEach((queue) => {
			this.lambdaFunction.addEventSource(new SqsEventSource(queue));
		});

		this.props.subscriptions?.forEach((table) => {
			this.lambdaFunction.addEventSource(
				new DynamoEventSource(table, {
					startingPosition: StartingPosition.LATEST,
					metricsConfig: { metrics: [MetricType.EVENT_COUNT] },
				}),
			);
		});
	}
}

export class DockerLambdaConstruct extends BaseLambdaConstruct {
	constructor(scope: Stack, id: string, props: DockerLambdaConstructProps) {
		super(scope, id, props);
	}

	protected createLambdaFunction(): DockerImageFunction {
		const props = this.props as DockerLambdaConstructProps; // Type assertion for specific props
		return new DockerImageFunction(this, this.resourceName(), {
			code: DockerImageCode.fromImageAsset(props.sourcePath),
			timeout: Duration.seconds(props.timeoutSeconds ?? 900),
			memorySize: props.memorySize ?? 1024,
			architecture: props.architecture ?? Architecture.ARM_64,
		});
	}
}

export class LambdaFunctionConstruct extends BaseLambdaConstruct {
	constructor(
		scope: Construct,
		id: string,
		props: RegularLambdaConstructProps,
	) {
		super(scope, id, props);
	}

	protected createLambdaFunction(): Function {
		const props = this.props as RegularLambdaConstructProps;
		return new Function(this, this.resourceName(), {
			memorySize: props.memorySize ?? 128,
			timeout: Duration.seconds(props.timeoutSeconds ?? 30),
			code: Code.fromAsset(props.sourcePath),
			runtime: props?.runtime ?? Runtime.NODEJS_22_X,
			handler: props?.handler ?? "index.handler",
		});
	}
}
