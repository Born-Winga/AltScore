import {
	type AppSyncIdentityCognito,
	type Context,
	util,
} from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
	const identity = ctx.identity as AppSyncIdentityCognito;
	const item = {
		...ctx.arguments.input,
		createdAt: util.time.nowISO8601(),
		updatedAt: util.time.nowISO8601(),
		owner: identity ? identity?.username : null,
		deleted: false,
		__typename: "Document",
	};
	const key = { id: ctx.args.id ?? util.autoId() };
	return ddb.put({
		key,
		item,
		condition: { expression: "attribute_not_exists(id)" },
	});
}

export function response(ctx: Context) {
	return ctx.result;
}
