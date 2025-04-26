import {
	SQSClient,
	SendMessageCommand,
	type SendMessageCommandInput,
} from "@aws-sdk/client-sqs";

import type { Document } from "@altscore/gql-types";

const sqsClient = new SQSClient({ region: process.env.AWS_REGION });

export const sendToSQS = async (payload: Document, msgType: string) => {
	try {
		const queueUrl = process.env.QUEUE_URL;
		if (!queueUrl) {
			throw new Error("SQS_QUEUE_URL environment variable not set");
		}

		const params: SendMessageCommandInput = {
			QueueUrl: queueUrl,
			MessageBody: JSON.stringify({
				content: payload,
				timestamp: new Date().toISOString(),
			}),
			// Optional parameters:
			MessageAttributes: {
				MessageType: {
					DataType: "String",
					StringValue: msgType,
				},
			},
		};

		// Send message
		const command = new SendMessageCommand(params);
		const response = await sqsClient.send(command);
		console.log("Message sent successfully:", response.MessageId);
		return {
			statusCode: 200,
			body: JSON.stringify({
				messageId: response.MessageId,
				sequenceNumber: response.SequenceNumber,
			}),
		};
	} catch (error) {
		console.error("Error sending message:", error);

		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "Failed to send message to SQS",
				details: error instanceof Error ? error.message : "Unknown error",
			}),
		};
	}
};
