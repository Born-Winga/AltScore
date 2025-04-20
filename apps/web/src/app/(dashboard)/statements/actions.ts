import { generateClient } from "aws-amplify/data";
import type { SchemaType } from "../../../../../../infra/amplify/data/schema";
const client = generateClient<SchemaType>({
	authMode: "userPool",
});
export async function listDocuments() {
	try {
		const documents = await client.models.Document.list();

		console.log({ documents });
		return documents;
	} catch (err) {
		console.log(err);
	}
}
