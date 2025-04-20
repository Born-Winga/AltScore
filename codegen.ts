import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: [
		"infra/core/lib/data/model/schema.graphql",
		"infra/core/lib/data/model/aws-scalars.graphql",
	],
	documents: "src/**/*.tsx",
	ignoreNoDocuments: true,
	generates: {
		"./packages/gql-types/": {
			preset: "client",
			plugins: [
				"typescript-operations",
				"typescript-resolvers"
			],
			config: {
				scalars: {
					AWSDateTime: "Date",
					AWSEmail: "string",
					AWSJSON: "string",
					AWSURL: "string",
					AWSTimestamp: "string",
				},
			},

		},
		// "./graphql.schema.json": {
		// 	plugins: ["introspection"],
		// },
	},
};

export default config;
