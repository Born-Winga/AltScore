import { a, type ClientSchema } from "@aws-amplify/backend";
import { User, Document, Transaction, DocumentLog } from "./models";

export const schema = a.schema({
	Document,
	User,
	Transaction,
	DocumentLog,
});

export type SchemaType = ClientSchema<typeof schema>;
