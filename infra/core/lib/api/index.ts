import { CfnOutput, Stack, type StackProps } from "aws-cdk-lib";
import {
	AuthorizationType,
	CognitoUserPoolsAuthorizer,
	Cors,
	LambdaIntegration,
	RestApi,
} from "aws-cdk-lib/aws-apigateway";
import type { UserPool } from "aws-cdk-lib/aws-cognito";
import type { Function } from "aws-cdk-lib/aws-lambda";
import type { Construct } from "constructs";

export interface RestApiProps extends StackProps {
	appName: string;
	envName: string;
	resource: string;
	handler?: Function;
	corsConfig: Cors;
	userPools: [UserPool];
}

export class RootApiStack extends Stack {
	constructor(scope: Construct, id: string, props: RestApiProps) {
		super(scope, id, props);

		// Create REST API
		const api = new RestApi(this, `RootRestApi`, {
			defaultCorsPreflightOptions: {
				allowOrigins: Cors.ALL_ORIGINS,
				allowMethods: Cors.ALL_METHODS,
				allowHeaders: ["Authorization"], // Explicitly allow Authorization header
			},
			deployOptions: { stageName: props.envName },
		});

		// Create Cognito Authorizer
		const cognitoAuthorizer = new CognitoUserPoolsAuthorizer(
			this,
			`${props.appName}-${props.envName}-Authorizer`,
			{ cognitoUserPools: props.userPools },
		);

		const resource = api.root.addResource(props.resource);

		// Add methods to the resource (not the root)
		let integration = undefined;
		if (props.handler) {
			integration = new LambdaIntegration(props.handler);
		}
		// Apply Cognito auth to all methods on the resource
		resource.addMethod("GET", integration, {
			authorizationType: AuthorizationType.NONE,
		});

		resource.addMethod("POST", integration, {
			authorizationType: AuthorizationType.COGNITO,
			authorizer: cognitoAuthorizer,
		});

		resource.addMethod("PUT", integration, {
			authorizationType: AuthorizationType.COGNITO,
			authorizer: cognitoAuthorizer,
		});

		resource.addMethod("DELETE", integration, {
			authorizationType: AuthorizationType.COGNITO,
			authorizer: cognitoAuthorizer,
		});

		new CfnOutput(this, "StatementsAPI", {
			value: api.urlForPath(`/${props.resource}`), // Correct URL for your resource
			exportName: "StatementUrl",
		});
	}
}
