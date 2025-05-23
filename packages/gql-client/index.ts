import { outputs } from "@altscore/cdk-outputs";
import fetch from "node-fetch";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { Sha256 } from "@aws-crypto/sha256-js";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

interface GraphQLRequest {
	query: string;
	variables?: Record<string, unknown>;
}

interface GraphQLResponse {
	statusCode: number;
	body: string;
}

export async function execGraphqlQuery({
	query,
	variables,
}: GraphQLRequest): Promise<GraphQLResponse> {
	let GRAPHQL_ENDPOINT = process?.env?.GRAPHQL_URL || null;
	if (!GRAPHQL_ENDPOINT) {
		GRAPHQL_ENDPOINT = await getAppSyncUrl();
		if (!GRAPHQL_ENDPOINT) throw new Error("GET SSM API URL ERROR");
	}

	const endpoint = new URL(GRAPHQL_ENDPOINT);
	const body = JSON.stringify({ query, variables });

	const request = new HttpRequest({
		method: "POST",
		protocol: endpoint.protocol,
		hostname: endpoint.hostname,
		path: endpoint.pathname,
		headers: {
			"Content-Type": "application/json",
			Host: endpoint.hostname,
		},
		body,
	});

	const signer = new SignatureV4({
		credentials: defaultProvider(),
		service: "appsync",
		region: "us-east-1",
		sha256: Sha256,
	});

	const signed = await signer.sign(request);

	const response = await fetch(GRAPHQL_ENDPOINT, {
		method: signed.method,
		headers: signed.headers as Record<string, string>,
		body: signed.body,
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`GraphQL call failed: ${response.status} ${errorText}`);
	}

	const responseBody = await response.json();

	return {
		statusCode: response.status,
		body: JSON.stringify(responseBody),
	};
}

async function getAppSyncUrl() {
	const client = new SSMClient({ region: "us-east-1" });
	const appSyncUrlInput = {
		Name: "/appsync/api-url",
		WithDecryption: true,
	};
	const command = new GetParameterCommand(appSyncUrlInput);
	const response = await client.send(command);
	return response.Parameter?.Value ?? null;
}
