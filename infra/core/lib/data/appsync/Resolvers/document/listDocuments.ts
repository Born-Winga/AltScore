import type { Context } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
	const { limit = 20, nextToken, filter } = ctx.arguments;

	const input = {
		limit,
		nextToken,
		filter: {},
	};

	if (filter) {
		input.filter = filter;
	}

	return ddb.scan({});
}

export const response = (ctx: Context) => {
	const items = ctx.result?.items ?? [];
	const nextToken = ctx.result?.nextToken;
	return { items, nextToken };
};
