import {
	type AppSyncIdentityCognito,
	type Context,
	util,
} from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
	const identity = ctx.identity as AppSyncIdentityCognito;
	const id = ctx.arguments.input.id ?? util.autoId();
	const item = {
		...ctx.arguments.input,
		id,
		createdAt: util.time.nowISO8601(),
		updatedAt: util.time.nowISO8601(),
		owner: identity?.sub ?? null,
		deleted: false,
		__typename: "Document",
	};

	return ddb.put({
		key: { id },
		item,
	});
}

export function response(ctx: Context) {
	return ctx.result;
}
