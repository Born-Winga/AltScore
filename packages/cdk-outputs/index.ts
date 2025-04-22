
import cdk_outputs from "./outputs.json";
export const appName = ""
export const envName = ""
export const stageName = ""
const UserpoolOutputs = cdk_outputs["AltScore-AuthStack"];
const AppysncOutputs = cdk_outputs["AltScore-AppSyncStack"];
const S3Outputs = cdk_outputs["AltScore-S3Stack"];

export const outputs = {
    Auth: {
        Cognito: {
            userPoolClientId: UserpoolOutputs.AltScoredevUserPoolClientId,
            userPoolId: UserpoolOutputs.AltScoredevUserPoolId,
            identityPoolId: UserpoolOutputs.AltScoredevIdentityPoolId,
            username: 'true',
            email: 'true',
        }
    },
    API: {
        GraphQL: {
            endpoint: AppysncOutputs.awsAppsyncApiEndpoint,
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            defaultAuthMode: AppysncOutputs.awsAppsyncAuthenticationType as any,
            apiKey: AppysncOutputs.awsAppsyncApiKey,
            region: 'us-east-1',
        }
    },
    Storage: {
        S3: {
            bucket: S3Outputs.AltScoredevBucketName,
            region: 'us-east-1'
        }
    }
}
