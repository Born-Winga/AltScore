import { outputs } from "@altscore/cdk-outputs";
import fetch from "node-fetch";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { Sha256 } from "@aws-crypto/sha256-js";

const AWS_REGION = process.env.REGION ?? "us-east-1";
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL ?? outputs.API.GraphQL.endpoint;

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
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const body = JSON.stringify({ query, variables });

  const request = new HttpRequest({
    method: "POST",
    protocol: endpoint.protocol,
    hostname: endpoint.hostname,
    path: endpoint.pathname,
    headers: {
      "Content-Type": "application/json",
      host: endpoint.hostname,
    },
    body,
  });

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    service: "appsync",
    region: AWS_REGION,
    sha256: Sha256,
  });

  const signed = await signer.sign(request);

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: signed.method,
    headers: signed.headers as Record<string, string>,
    body: signed.body?.toString(),
  });

  const responseBody = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(responseBody),
  };
}
