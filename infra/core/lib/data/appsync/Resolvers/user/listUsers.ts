import type { Context } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
	console.log(ctx.arguments);
	console.log(ctx);
	return ddb.scan({
		limit: ctx?.arguments?.limit ?? 20,
		nextToken: ctx.arguments?.nextToken,
		filter: ctx.arguments.filter,
	});
}

export const response = (ctx: Context) => ctx.result;
