import { Duration, Stack, type StackProps } from "aws-cdk-lib";
import {
	AccountRecovery,
	UserPool,
	UserPoolClient,
	VerificationEmailStyle,
} from "aws-cdk-lib/aws-cognito";
import {
	IdentityPool,
	UserPoolAuthenticationProvider,
} from "aws-cdk-lib/aws-cognito-identitypool";
import { CfnOutput } from "aws-cdk-lib";

import type { Construct } from "constructs";

export interface AuthStackProps extends StackProps {
	envName: string;
	appName: string;
	allowUnauthenticatedIdentities?: boolean;
}

export class AuthStack extends Stack {
	public readonly userPool: UserPool;
	public readonly userPoolClient: UserPoolClient;
	public readonly identityPool: IdentityPool;

	constructor(scope: Construct, id: string, props: AuthStackProps) {
		super(scope, id, props);

		const { envName, appName, allowUnauthenticatedIdentities = false } = props;

		// Helper function for consistent naming
		const resourceName = (suffix: string) => `${appName}-${envName}-${suffix}`;

		// Create Cognito User Pool with security best practices
		this.userPool = new UserPool(this, resourceName("userpool"), {
			userPoolName: resourceName("userpool"),
			signInCaseSensitive: false,
			selfSignUpEnabled: true,
			passwordPolicy: {
				minLength: 8,
				requireLowercase: true,
				requireUppercase: true,
				requireDigits: true,
				requireSymbols: true,
				tempPasswordValidity: Duration.days(3),
			},
			userVerification: {
				emailSubject: "You need to verify your email",
				emailBody: "Thanks for signing up Your verification code is {####}",
				emailStyle: VerificationEmailStyle.CODE,
			},
			accountRecovery: AccountRecovery.EMAIL_ONLY,
			standardAttributes: {
				email: {
					required: true,
					mutable: true,
				},
			},
		});

		// Create User Pool Client with explicit auth flows
		this.userPoolClient = new UserPoolClient(
			this,
			resourceName("userpool-client"),
			{
				userPool: this.userPool,
				userPoolClientName: resourceName("userpool-client"),
				authFlows: {
					userPassword: true,
					userSrp: true,
				},
			},
		);

		// Create Identity Pool with configurable unauthenticated access
		this.identityPool = new IdentityPool(this, resourceName("id-pool"), {
			identityPoolName: resourceName("id-pool"),
			allowUnauthenticatedIdentities,
			authenticationProviders: {
				userPools: [
					new UserPoolAuthenticationProvider({
						userPool: this.userPool,
						userPoolClient: this.userPoolClient,
					}),
				],
			},
		});

		new CfnOutput(this, resourceName("UserPoolId"), {
			value: this.userPool.userPoolId,
			exportName: resourceName("UserPoolId"),
			description: "User Pool ID",
		});

		new CfnOutput(this, resourceName("UserPoolClientId"), {
			value: this.userPoolClient.userPoolClientId,
			exportName: resourceName("UserPoolClientId"),
			description: "User Pool Client ID",
		});

		new CfnOutput(this, resourceName("IdentityPoolId"), {
			value: this.identityPool.identityPoolId,
			exportName: resourceName("IdentityPoolId"),
			description: "Identity Pool ID",
		});
	}
}
