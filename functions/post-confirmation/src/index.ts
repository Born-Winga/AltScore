import type {
	PostConfirmationTriggerEvent,
	PostConfirmationTriggerHandler,
} from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { addUserToGroup, createCognitoUser } from "./lib";
const cognitoClient = new CognitoIdentityProviderClient();

export const logger = new Logger({ serviceName: "postConfirmationFn" });
export const handler: PostConfirmationTriggerHandler = async (
	event: PostConfirmationTriggerEvent,
) => {
	console.log(JSON.stringify(event, null, 2));
	const response = await Promise.all([
		addUserToGroup(cognitoClient, event),
		createCognitoUser(event),
	]);
	console.log({ response });
	return event;
};
