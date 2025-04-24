import { type App, CfnOutput, Duration, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import { AnyPrincipal, ArnPrincipal, Effect, PolicyStatement, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { BlockPublicAccess, Bucket, HttpMethods } from "aws-cdk-lib/aws-s3";

export interface S3StackProps extends StackProps {
    appName: string;
    envName: string;
}
export class S3Stack extends Stack {
    public readonly bucket: Bucket
    constructor(scope: App, id: string, props: S3StackProps) {
        super(scope, id, props)
        const { appName, envName } = props
        const resourceName = (suffix: string) => `${appName}-${envName}-${suffix}`;
        this.bucket = new Bucket(this, resourceName('s3-storage'), {
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            cors: [
                {
                    allowedOrigins: ['http://localhost', 'http://localhost:3000'],  // Allow localhost (or your frontend URL)
                    allowedMethods: [
                        HttpMethods.GET, HttpMethods.POST, HttpMethods.PUT, HttpMethods.DELETE, HttpMethods.HEAD
                    ],
                    allowedHeaders: ["*"],
                    maxAge: 300,
                }
            ],
            removalPolicy: RemovalPolicy.DESTROY
        })
        this.bucket.addToResourcePolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                principals: [new ServicePrincipal("lambda.amazonaws.com")],
                actions: ["s3:GetObject", "s3:PutObject"],
                resources: [`${this.bucket.bucketArn}/*`],
            })
        );

        new CfnOutput(this, resourceName("BucketName"), {
            value: this.bucket.bucketName,
            exportName: resourceName("BucketName"),
            description: "S3 Bucket Name",
        });
        new CfnOutput(this, resourceName("BucketArn"), {
            value: this.bucket.bucketArn,
            exportName: resourceName("BucketArn"),
            description: "S3 Bucket Name",
        });
    }
}