import {
	CfnOutput,
	Duration,
	Expiration,
	RemovalPolicy,
	Stack,
	type StackProps,
} from "aws-cdk-lib";
import type { Construct } from "constructs";
import path = require("node:path");
import { UserPool } from "aws-cdk-lib/aws-cognito";
import {
	AuthorizationType,
	Code,
	Definition,
	FunctionRuntime,
	GraphqlApi,
	MappingTemplate,
	PrimaryKey,
	Values,
} from "aws-cdk-lib/aws-appsync";
import {
	Table,
	AttributeType,
	BillingMode,
	ProjectionType,
	StreamViewType,
} from "aws-cdk-lib/aws-dynamodb";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { RetentionDays } from "aws-cdk-lib/aws-logs";

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
	public readonly api: GraphqlApi;

	constructor(scope: Construct, id: string, props: ApiStackProps) {
		super(scope, id, props);
		const { appName, envName, userPoolId } = props;
		const userPool = UserPool.fromUserPoolId(this, "UserPool", userPoolId);

		const resourceName = (suffix: string) => `${appName}-${envName}-${suffix}`;
		this.api = new GraphqlApi(this, resourceName("Appsync-Stack"), {
			name: resourceName("Appsync-Stack"),
			definition: Definition.fromFile(
				path.join(__dirname, "../model/schema.graphql"),
			),
			xrayEnabled: true,
			authorizationConfig: {
				defaultAuthorization: {
					authorizationType: AuthorizationType.USER_POOL,
					userPoolConfig: {
						userPool,
					},
				},
				additionalAuthorizationModes: [
					{
						authorizationType: AuthorizationType.API_KEY,
						apiKeyConfig: {
							description: "Public API key for limited access",
							expires: Expiration.after(Duration.days(7)),
						},
					},
					{
						authorizationType: AuthorizationType.IAM,
					},
				],
			},
			logConfig: {
				retention: RetentionDays.ONE_DAY,
				excludeVerboseContent: false
			},
		});

		// In AppsyncStack
		new StringParameter(this, "AppSyncApiUrl", {
			parameterName: "/appsync/api-url",
			stringValue: this.api.graphqlUrl,
		});

		new StringParameter(this, "AppSyncApiId", {
			parameterName: "/appsync/api-id",
			stringValue: this.api.apiId,
		});
		const tableName = (suffix: string) => `${suffix}-${appName}-${envName}`;
		// Users Table
		this.usersTable = new Table(this, tableName("User"), {
			tableName: tableName("User"),
			partitionKey: { name: "id", type: AttributeType.STRING },
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		// Documents Table
		this.documentsTable = new Table(this, tableName("Document"), {
			tableName: tableName("Document"),
			partitionKey: { name: "id", type: AttributeType.STRING },
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
			stream: StreamViewType.NEW_AND_OLD_IMAGES,
		});

		// Add GSI for user documents relationship
		this.documentsTable.addGlobalSecondaryIndex({
			indexName: "documentsByUser",
			partitionKey: { name: "userId", type: AttributeType.STRING },
			projectionType: ProjectionType.ALL,
		});

		// Transactions Table
		this.transactionsTable = new Table(this, tableName("Transaction"), {
			tableName: tableName("Transaction"),
			partitionKey: { name: "id", type: AttributeType.STRING },
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		// Add GSI for document transactions relationship
		this.transactionsTable.addGlobalSecondaryIndex({
			indexName: "transactionsByDocument",
			partitionKey: { name: "documentId", type: AttributeType.STRING },
			projectionType: ProjectionType.ALL,
		});

		// Document Logs Table
		this.documentLogsTable = new Table(this, tableName("DocumentLog"), {
			tableName: tableName("DocumentLog"),
			partitionKey: { name: "id", type: AttributeType.STRING },
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		// Add GSI for document logs relationship
		this.documentLogsTable.addGlobalSecondaryIndex({
			indexName: "logsByDocument",
			partitionKey: { name: "documentId", type: AttributeType.STRING },
			projectionType: ProjectionType.ALL,
		});

		// Create Data Sources
		const usersDataSource = this.api.addDynamoDbDataSource(
			tableName("UsersDataSource"),
			this.usersTable,
		);
		const documentsDataSource = this.api.addDynamoDbDataSource(
			tableName("DocumentsDataSource"),
			this.documentsTable,
		);

		// Create Resolvers
		usersDataSource.createResolver("GetUserQueryResolver", {
			typeName: "Query",
			fieldName: "getUser",
			requestMappingTemplate: MappingTemplate.dynamoDbGetItem("id", "id"),
			responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
		});

		usersDataSource.createResolver("ScanUsersQueryResolver", {
			typeName: "Query",
			fieldName: "listUsers",
			requestMappingTemplate: MappingTemplate.dynamoDbScanTable(),
			responseMappingTemplate: MappingTemplate.dynamoDbResultList(),
		});

		usersDataSource.createResolver("CreateUserMutationResolver", {
			typeName: "Mutation",
			fieldName: "createUser",
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(
				path.join(__dirname, "./Resolvers/JS_RESOLVERS/user/createUser.js"),
			),
		});

		usersDataSource.createResolver("UpdateUserMutationResolver", {
			typeName: "Mutation",
			fieldName: "updateUser",
			requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
				PrimaryKey.partition("id").is("input.id"),
				Values.projecting("input"),
			),
			responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
		});

		documentsDataSource.createResolver("GetDocumentQueryResolver", {
			typeName: "Query",
			fieldName: "getDocument",
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(
				path.join(
					__dirname,
					"./Resolvers/JS_RESOLVERS/document/getDocument.js",
				),
			),
		});

		documentsDataSource.createResolver("ScanDocumentsQueryResolver", {
			typeName: "Query",
			fieldName: "listDocuments",
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(
				path.join(
					__dirname,
					"./Resolvers/JS_RESOLVERS/document/listDocuments.js",
				),
			),
		});

		documentsDataSource.createResolver("CreateDocumentMutationResolver", {
			typeName: "Mutation",
			fieldName: "createDocument",
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(
				path.join(
					__dirname,
					"./Resolvers/JS_RESOLVERS/document/createDocument.js",
				),
			),
		});

		documentsDataSource.createResolver("UpdateDocumentMutationResolver", {
			typeName: "Mutation",
			fieldName: "updateDocument",
			runtime: FunctionRuntime.JS_1_0_0,
			code: Code.fromAsset(
				path.join(
					__dirname,
					"./Resolvers/JS_RESOLVERS/document/updateDocument.js",
				),
			),
		});

		new CfnOutput(this, "GraphQLAPIURL", {
			value: this.api.graphqlUrl,
		});
		new CfnOutput(this, "GraphQLAPIKey", {
			value: this.api.apiKey as string,
		});

		new CfnOutput(this, "GraphQLAPIID", {
			value: this.api.apiId,
		});
		new CfnOutput(this, "GraphQLAuthMode", {
			value: AuthorizationType.USER_POOL,
		});
	}
}
