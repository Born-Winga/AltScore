import type { Construct } from "constructs";
import {
    DockerImageFunction,
    DockerImageCode,
    Architecture,
    Function,
    Code,
    type Runtime,
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

export interface BaseFunctionConstructProps {
    functionName: string;
    timeoutSeconds?: number;
    memorySize?: number;
    policyStatements?: PolicyStatement[];
    subscriptions?: Table[];
    envs?: Record<string, string>;
    queues?: Queue[];
}

export interface RegularLambdaConstructProps
    extends BaseFunctionConstructProps {
    sourcePath: string;
    runtime: Runtime;
    handler: string;
}

export interface DockerLambdaConstructProps extends BaseFunctionConstructProps {
    sourcePath: string;
    architecture?: Architecture;
}

export class DockerLambdaConstruct extends Stack {
    public readonly lambdaFunction: DockerImageFunction;

    constructor(scope: Stack, id: string, props: DockerLambdaConstructProps) {
        super(scope, id);

        for (const table of props?.subscriptions ?? []) {
            if (!table.tableStreamArn) {
                throw new Error(
                    `DynamoDB table ${table.tableName} must have a stream enabled.`,
                );
            }
        }

        this.lambdaFunction = new DockerImageFunction(
            this,
            props.functionName || id,
            {
                code: DockerImageCode.fromImageAsset(props.sourcePath),
                timeout: Duration.seconds(props.timeoutSeconds ?? 900),
                memorySize: props.memorySize ?? 1024,
                architecture: props.architecture ?? Architecture.ARM_64,
            },
        );

        // Add environment variables
        const envEntries = Object.entries(props.envs ?? {});
        for (const [key, value] of envEntries) {
            this.lambdaFunction.addEnvironment(key, value);
        }

        for (const statement of props.policyStatements ?? []) {
            this.lambdaFunction.addToRolePolicy(statement);
        }

        for (const queue of props.queues ?? []) {
            this.lambdaFunction.addEventSource(new SqsEventSource(queue));
        }

        for (const table of props.subscriptions ?? []) {
            this.lambdaFunction.addEventSource(
                new DynamoEventSource(table, {
                    startingPosition: StartingPosition.LATEST,
                    metricsConfig: {
                        metrics: [MetricType.EVENT_COUNT],
                    },
                }),
            );
        }
    }
}

export class LambdaFunctionConstruct extends Stack {
    public readonly lambdaFunction: Function;

    constructor(scope: Construct, id: string, props: RegularLambdaConstructProps) {
        super(scope, id);
        for (const table of props?.subscriptions ?? []) {
            if (!table.tableStreamArn) {
                throw new Error(
                    `DynamoDB table ${table.tableName} must have a stream enabled.`,
                );
            }
        }

        this.lambdaFunction = new Function(this, props.functionName, {
            memorySize: props?.memorySize ?? 128,
            timeout: Duration.seconds(props?.timeoutSeconds ?? 30),
            code: Code.fromAsset(props.sourcePath),
            runtime: props.runtime,
            handler: props.handler,
        });

        // Add environment variables
        const envEntries = Object.entries(props.envs ?? {});
        for (const [key, value] of envEntries) {
            this.lambdaFunction.addEnvironment(key, value);
        }

        for (const statement of props.policyStatements ?? []) {
            this.lambdaFunction.addToRolePolicy(statement);
        }

        for (const queue of props.queues ?? []) {
            this.lambdaFunction.addEventSource(new SqsEventSource(queue));
        }

        for (const table of props.subscriptions ?? []) {
            this.lambdaFunction.addEventSource(
                new DynamoEventSource(table, {
                    startingPosition: StartingPosition.LATEST,
                    metricsConfig: {
                        metrics: [MetricType.EVENT_COUNT],
                    },
                }),
            );
        }
    }
}
