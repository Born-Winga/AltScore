import { Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Queue, type QueueProps } from "aws-cdk-lib/aws-sqs";
import  type { Construct } from "constructs";

export interface Props extends QueueProps {
	isFifo: boolean;
	timeoutSeconds: number;
}
export class QueueConstruct extends Stack {
	public readonly queue: Queue;
	constructor(stack: Construct, id: string, props: Props) {
		super(stack, id);
		this.queue = new Queue(this, "Queue", {
			queueName: props.queueName,
			fifo: props.isFifo ?? false,
			removalPolicy: RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
			visibilityTimeout: Duration.seconds(props.timeoutSeconds),
		});
	}
}
