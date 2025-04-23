import type { DynamoDBStreamEvent, Handler } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import {
	S3Client,
	GetObjectCommand,
	type GetObjectCommandInput,
	type GetObjectCommandOutput,
} from "@aws-sdk/client-s3";
import type { Document, GetDocumentQuery, GetDocumentQueryVariables } from "@altscore/gql-types";
import type { Readable } from "node:stream";
import { PdfReader } from "pdfreader";
import { createHash } from "node:crypto";
import { execGraphqlQuery } from "@altscore/gql-client"
import { getDocument } from "@altscore/gql-types";

const s3Client = new S3Client();
export const handler: Handler = async (event: DynamoDBStreamEvent, context) => {
	console.log("ENV DUMP:: ", process.env);
	const records = event.Records;
	for (const record of records) {
		const newImage = record.dynamodb?.NewImage ?? null;
		if (newImage) {
			// @ts-expect-error
			const dataObject: Document = unmarshall(newImage) as Document;
			console.log("Processing Record: ", JSON.stringify(dataObject, null, 2));
			console.log("Password: ", dataObject?.password ?? "");
			// get document
			const fetchDocument = await execGraphqlQuery({
				query: getDocument,
				variables: {
					id: dataObject.id
				}
			});

			console.log("Fetch Doc: ", JSON.stringify(fetchDocument, null, 2));
			const document = await getS3Object(s3Client, dataObject.url);
			console.log("DocBody: ", document?.Body);
			if (document) {
				const buffer = await streamToBuffer(document.Body as Readable);
				const pdfText = await extractTextFromBuffer(buffer);

				// get file content hash
				const fileHash = createHash("sha256");
				fileHash.update(pdfText);
				const hash = fileHash.digest("hex");
				console.log("FileHash:: ", hash);
			}
		}
	}
	console.log(JSON.stringify(event));
	console.log(JSON.stringify(context));

	/**
	 * Get Document
	 * Get document content Hash
	 * Validate content has doesnt exist yet
	 * Update Document status
	 * Put Document in Queue
	 */

	return "Hello, World!";
};

export async function getS3Object(client: S3Client, fileKey: string) {
	const bucket = process?.env?.DOCUMENT_BUCKET ?? null;
	if (!bucket) {
		console.log("Bucket Env Param Null:");
		return null;
	}
	try {
		const input: GetObjectCommandInput = {
			Bucket: bucket,
			Key: fileKey,
		};
		const command = new GetObjectCommand(input);
		const response: GetObjectCommandOutput = await client.send(command);
		return response;
	} catch (err) {
		console.error("Error getting document object:", err);
	}
}

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
	const chunks: Uint8Array[] = [];
	for await (const chunk of stream) {
		chunks.push(chunk);
	}
	return Buffer.concat(chunks);
};

const extractTextFromBuffer = (buffer: Buffer): Promise<string> => {
	console.log("Here 0");
	return new Promise((resolve, reject) => {
		const textChunks: string[] = [];

		new PdfReader().parseBuffer(buffer, (err, item) => {
			if (err) {
				return reject(err);
			}
			if (!item) {
				return resolve(textChunks.join(" "));
			}
			if (item.text) {
				textChunks.push(item.text);
			}
		});

		return textChunks;
	});
};
