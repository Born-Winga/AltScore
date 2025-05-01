import {
	type S3Client,
	type GetObjectCommandInput,
	GetObjectCommand,
	type GetObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { PdfReader } from "pdfreader";
import type { Readable } from "node:stream";

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

export const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
	const chunks: Uint8Array[] = [];
	for await (const chunk of stream) {
		chunks.push(chunk);
	}
	return Buffer.concat(chunks);
};

export const extractTextFromBuffer = (
	buffer: Buffer,
	password: string,
): Promise<string |null> => {
	try {
		console.log("Here 0");
		return new Promise((resolve, reject) => {
			const textChunks: string[] = [];

			new PdfReader({ password: password }).parseBuffer(buffer, (err, item) => {
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
	} catch (error) {
		console.log("ERRO: ", error);
		return  Promise.resolve(null)
	}
};
