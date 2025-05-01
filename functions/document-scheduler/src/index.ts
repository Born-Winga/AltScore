import type {
	AttributeValue,
	DynamoDBRecord,
	DynamoDBStreamEvent,
	Handler,
} from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import type { Document } from "@altscore/gql-types";
import type { Readable } from "node:stream";
import { createHash } from "node:crypto";
import { execGraphqlQuery } from "@altscore/gql-client";
import { getDocument, updateDocument } from "@altscore/gql-types";
import { extractTextFromBuffer, getS3Object, streamToBuffer } from "./utils";
import { sendToSQS } from "./utils/sqs";

const s3Client = new S3Client();
export const handler: Handler = async (event: DynamoDBStreamEvent, context) => {
	console.log("Event: ", JSON.stringify(event));
	const records = event.Records;
	await Promise.all(records.map((record) => handleDocumentStreamEvent(record)));
};

const handleDocumentStreamEvent = async (record: DynamoDBRecord) => {
	// handle creation only
	// unmarshall to Document type & get info
	const eventType = record.eventName;
	if (eventType !== "INSERT") return;
	const newImage = record.dynamodb?.NewImage ?? null;
	if (!newImage) throw new Error("Error Procesing Stream Event");
	const image = newImage as Record<string, AttributeValue>;
	//@ts-expect-error
	const docInfo: Document = unmarshall(image) as Document;
	console.log("DocInfo: ", docInfo);
	// preprocess document to get hash and validate is fine
	const document = await getS3Object(s3Client, docInfo.url);
	if (!document) throw new Error(`Error Reading Docucment ${docInfo}`);
	const buffer = await streamToBuffer(document.Body as Readable);
	const pdfText = await extractTextFromBuffer(buffer, docInfo.password || "");
	console.info("LOGS: ", pdfText?.substring(0,300))
	if(!pdfText) return
	// get file content hash
	const fileHash = createHash("sha256");
	fileHash.update(pdfText);
	const hash = fileHash.digest("hex");

	// update document hash

	docInfo.hash = hash;
	const input = {
		id: docInfo.id,
		hash,
	};

	console.log("Query Input: ", input);
	const updateResponse = await execGraphqlQuery({
		query: updateDocument,
		variables: {
			input,
		},
	});

	console.log("Update Response: ", updateResponse);
	// add document to queue to be processed

	const sqsResponse = await sendToSQS(docInfo, "DocumentInfo");
	console.log(sqsResponse);
};
