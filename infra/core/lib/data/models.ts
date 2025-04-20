import { a } from "@aws-amplify/backend";

export const User = a
	.model({
		id: a.id(),
		name: a.string(),
		email: a.email(),
		createdAt: a.timestamp(),
		updatedAt: a.timestamp(),
		apiKey: a.string(),
		status: a.string().default("ACTIVE"),
		deleted: a.boolean().default(false),
		documents: a.hasMany("Document", "userId"),
	})
	.authorization((allow) => [
		allow.authenticated().to(["read"]),
		allow.owner("userPools").to(["create", "read", "update"]),
	]);
const DocStatusEnum = a.enum([
	"PROCESSING",
	"REJECTED",
	"PROCESSED",
	"SUBMITTED",
]);
export const Document = a
	.model({
		id: a.id(),
		type: a.string().required(),
		name: a.string().required(),
		issuer: a.string().required(),
		password: a.string(),
		userId: a.id().required(),
		user: a.belongsTo("User", "userId"),
		status: DocStatusEnum,
		expiryDate: a.datetime(),
		createdAt: a.timestamp(),
		updatedAt: a.timestamp(),
		summary: a.json(),
		hash: a.string(),
		shortId: a.string().required(),
		url: a.string().required(),
		transactions: a.hasMany("Transaction", "documentId"),
		log: a.hasMany("DocumentLog", "documentId"),
	})
	.authorization((allow) => [
		allow.authenticated().to(["read"]),
		allow.owner("userPools").to(["create", "read", "update"]),
	]);

const TransactionDescriptionEnum = a.enum([
	"OVERDRAFT",
	"LOAN",
	"DEPOSIT",
	"PAYMENT",
	"SAVING",
]);
export const Transaction = a
	.model({
		id: a.id(),
		type: a.enum(["CREDIT", "DEBIT"]),
		description: TransactionDescriptionEnum,
		amount: a.float(),
		details: a.string(),
		documentId: a.id(),
		document: a.belongsTo("Document", "documentId"),
		createdAt: a.timestamp(),
		updatedAt: a.timestamp(),
	})
	.authorization((allow) => [
		allow.authenticated().to(["read"]),
		allow.owner("userPools").to(["create", "read", "update"]),
	]);

export const DocumentLog = a
	.model({
		id: a.id(),
		documentId: a.id(),
		document: a.belongsTo("Document", "documentId"),
		createdAt: a.timestamp(),
		updatedAt: a.timestamp(),
	})
	.authorization((allow) => [
		allow.authenticated().to(["read"]),
		allow.owner("userPools").to(["create", "read", "update"]),
	]);
