import {
	AdminAddUserToGroupCommand,
	type CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

import { execGraphqlQuery } from "@altscore/gql-client";
import { createUser, User } from "@altscore/gql-types";
import type { PostConfirmationTriggerEvent } from "aws-lambda";
export async function addUserToGroup(
	cognitoClient: CognitoIdentityProviderClient,
	event: PostConfirmationTriggerEvent,
) {
	try {
		const command = new AdminAddUserToGroupCommand({
			GroupName: process.env.DEFAULT_GROUP,
			Username: event.userName,
			UserPoolId: event.userPoolId,
		});
		const response = await cognitoClient.send(command);
		console.log("TOGROUP_RES: ", JSON.stringify(response, null, 2));
	} catch (e) {}
}

export async function createCognitoUser(event: PostConfirmationTriggerEvent) {
	const user = {
		id: event.request.userAttributes.sub,
		name: event.request.userAttributes.email,
		email: event.request.userAttributes.email,
		status: event.request.userAttributes["cognito:user_status"],
	};
	const response = execGraphqlQuery({
		query: createUser,
		variables: {
			input: user,
		},
	});
	return response;
}
