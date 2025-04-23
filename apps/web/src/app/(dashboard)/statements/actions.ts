"use client";
import {
	createDocument,
	listDocuments,
	type Document,
    type ModelDocumentConnection,
} from "@altscore/gql-types";
import { generateClient } from "aws-amplify/data";

const client = generateClient();
export async function getDocuments() {
	const documents = (await client.graphql({
		query: listDocuments,
        variables:{
            limit : 500
        }
	}))  
    console.log(documents)
	return documents.data.listDocuments.items
}

export async function saveDocument(payload: Document) {
	const results = await client.graphql({
		query: createDocument,
		variables: {
			input: payload,
		},
	});
	console.log(results);
}
