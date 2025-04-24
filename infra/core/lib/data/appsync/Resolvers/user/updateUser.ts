import { type Context, util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
	const item = {
		...ctx.arguments.input,
		updatedAt: util.time.nowISO8601(),
	};
	const key = { id: ctx.args.id };
	return ddb.update({
		key,
		update: { ...item }
	});
}

export function response(ctx: Context) {
	return ctx.result;
}
