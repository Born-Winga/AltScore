import { type Context, util } from "@aws-appsync/utils";

export function request(ctx: Context) {
	const { id, ...input } = ctx.args.input;

	// Build DynamoDB UpdateItem parameters
	const updateExpressions = [];
	const expressionNames = {};
	const expressionValues = {};

	for (const [key, value] of Object.entries(input)) {
		updateExpressions.push(`#${key} = :${key}`);
		//@ts-expect-error
		expressionNames[`#${key}`] = key;
		//@ts-expect-error
		expressionValues[`:${key}`] = value;
	}

	return {
		operation: "UpdateItem",
		key: util.dynamodb.toMapValues({ id }),
		update: {
			expression: `SET ${updateExpressions.join(", ")}`,
			expressionNames,
			expressionValues: util.dynamodb.toMapValues(expressionValues),
		},
		condition: {
			expression: "attribute_exists(id)",
		},
	};
}

export function response(ctx: Context) {
	const { error, result } = ctx;
	if (error) {
		util.appendError(error.message, error.type);
	}
	return result;
}
