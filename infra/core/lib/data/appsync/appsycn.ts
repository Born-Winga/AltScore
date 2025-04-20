import { Duration, Stack, type StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";
import path = require("node:path");
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { AmplifyData, AmplifyDataDefinition } from '@aws-amplify/data-construct';

export interface ApiStackProps extends StackProps {
	envName: string;
	appName: string;
	userPoolId: string;
}
export class AppSyncStack extends Stack {
	public readonly graphQlApi: AmplifyData;

	constructor(scope: Construct, id: string, props: ApiStackProps) {
		super(scope, id, props);
		const { appName, envName, userPoolId } = props;
		const resourceName = (suffix: string) => `${appName}-${envName}-${suffix}`;
		this.graphQlApi = new AmplifyData(
			this,
			resourceName("graphgql-api"),
			{
				definition: AmplifyDataDefinition.fromFiles(
					path.join(__dirname, "../model/schema.graphql"),
				),
				authorizationModes: {
					defaultAuthorizationMode: "AMAZON_COGNITO_USER_POOLS",
					apiKeyConfig: {
						description: "API key for public access",
						expires: Duration.days(7),
					},
					userPoolConfig: {
						userPool: UserPool.fromUserPoolId(
							this,
							"AuthStackUserPoolImport",
							userPoolId,
						),
					},
				},
			},
		);
	}
}
