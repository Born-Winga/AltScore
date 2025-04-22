import { Duration, Expiration, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";
import path = require("node:path");
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { AuthorizationType, Definition, GraphqlApi } from "aws-cdk-lib/aws-appsync";
import { Table, AttributeType, BillingMode, ProjectionType } from "aws-cdk-lib/aws-dynamodb";

export interface ApiStackProps extends StackProps {
	envName: string;
	appName: string;
	userPoolId: string;
}
export class AppSyncStack extends Stack {

	public readonly usersTable: Table;
	public readonly documentsTable: Table;
	public readonly transactionsTable: Table;
	public readonly documentLogsTable: Table;

	constructor(scope: Construct, id: string, props: ApiStackProps) {
		super(scope, id, props);
		const { appName, envName, userPoolId } = props;
		const userPool = UserPool.fromUserPoolId(this, 'UserPool', userPoolId);

		const resourceName = (suffix: string) => `${appName}-${envName}-${suffix}`;
		const appsync = new GraphqlApi(this, resourceName('Appsync-Stack'), {
			name: resourceName('Appsync-Stack'),
			definition: Definition.fromFile(path.join(__dirname, '../model/schema.graphql')),
			xrayEnabled: true,
			authorizationConfig: {
				defaultAuthorization: {
					authorizationType: AuthorizationType.USER_POOL,
					userPoolConfig: {
						userPool
					}
				},
				additionalAuthorizationModes: [
					{
						authorizationType: AuthorizationType.API_KEY,
						apiKeyConfig: {
							description: 'Public API key for limited access'
						}

					},
					{
						authorizationType: AuthorizationType.IAM,
					}
				]

			}
		})

		const tableName = (suffix: string) => `${suffix}-${appsync.apiId}-${envName}`;
		// Users Table
		this.usersTable = new Table(this, tableName('User'), {
			tableName: tableName('User'),
			partitionKey: { name: 'id', type: AttributeType.STRING },
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		// Documents Table
		this.documentsTable = new Table(this, tableName('Document'), {
			tableName: tableName('Document'),
			partitionKey: { name: 'id', type: AttributeType.STRING },
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		// Add GSI for user documents relationship
		this.documentsTable.addGlobalSecondaryIndex({
			indexName: 'documentsByUser',
			partitionKey: { name: 'userId', type: AttributeType.STRING },
			projectionType: ProjectionType.ALL,
		});

		// Transactions Table
		this.transactionsTable = new Table(this, tableName('Transaction'), {
			tableName: tableName('Transaction'),
			partitionKey: { name: 'id', type: AttributeType.STRING },
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		// Add GSI for document transactions relationship
		this.transactionsTable.addGlobalSecondaryIndex({
			indexName: 'transactionsByDocument',
			partitionKey: { name: 'documentId', type: AttributeType.STRING },
			projectionType: ProjectionType.ALL,
		});

		// Document Logs Table
		this.documentLogsTable = new Table(this, tableName('DocumentLog'), {
			tableName: tableName('DocumentLog'),
			partitionKey: { name: 'id', type: AttributeType.STRING },
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		// Add GSI for document logs relationship
		this.documentLogsTable.addGlobalSecondaryIndex({
			indexName: 'logsByDocument',
			partitionKey: { name: 'documentId', type: AttributeType.STRING },
			projectionType: ProjectionType.ALL,
		});

		// Create Data Sources
		const usersDS = appsync.addDynamoDbDataSource(tableName('UsersDataSource'), this.usersTable);
		const documentsDS = appsync.addDynamoDbDataSource(tableName('DocumentsDataSource'), this.documentsTable);
		const transactionsDS = appsync.addDynamoDbDataSource(tableName('TransactionsDataSource'), this.transactionsTable);
		const documentLogsDS = appsync.addDynamoDbDataSource(tableName('DocumentLogsDataSource'), this.documentLogsTable);
	}
}
