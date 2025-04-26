import { type Context, util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx: Context) {
	const input = ctx.arguments.input;
	const key = { id: ctx.args.id };
  
	const updateExpression = [];
	const expressionValues = util.dynamodb.toMapValues({
	  ':updatedAt': util.time.nowISO8601()
	});
  
	const expressionNames = {}; // 🛠 Need this to support fields with reserved words or special characters
  
	// Add input fields to update
	for (const [field, value] of Object.entries(input)) {
	  if (value !== undefined && value !== null) {
		const fieldPlaceholder = `#${field}`;
		const valuePlaceholder = `:${field}`;
  
		updateExpression.push(`${fieldPlaceholder} = ${valuePlaceholder}`);
		// @ts-expect-error
		expressionValues[valuePlaceholder] = value;
		// @ts-expect-error
		expressionNames[fieldPlaceholder] = field;
	  }
	}
  
	// Add updatedAt to the update
	updateExpression.push('#updatedAt = :updatedAt');
	// @ts-expect-error
	expressionNames['#updatedAt'] = 'updatedAt';
  
	return ddb.update({
	  key,
	  update: {
		// biome-ignore lint/style/useTemplate: <explanation>
		expression: 'SET ' + updateExpression.join(', '),
		expressionNames: expressionNames, // 🔥 ADD THIS
		expressionValues: expressionValues,
	  },
	  condition: {
		expression: 'attribute_exists(id)', // ensures item must exist
	  }
	});
  }
  

export function response(ctx: Context) {
	return ctx.result;
}
