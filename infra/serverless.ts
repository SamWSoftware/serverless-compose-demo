import type { AWS } from "@serverless/typescript";

import DynamoResources from "./serverless/Dynamo";
import S3Buckets from "./serverless/s3";
import CognitoResources from "./serverless/cognitoResources";

const serverlessConfiguration: AWS = {
  service: "infra",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-central-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  package: { individually: true },
  custom: {
    websiteBucket: "${sls:stage}-${self:service}-website-bucket",
    assetBucket: "${sls:stage}-${self:service}-asset-bucket",
    tables: {
      configurationsTable: "${sls:stage}-compose-config-table",
    },
    domain: "compose-test",

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      ...S3Buckets,
      ...DynamoResources,
      ...CognitoResources,
    },
    Outputs: {
      region: { Value: "${self:provider.region}" },
      websiteBucket: { Value: "${self:custom.websiteBucket}" },
      assetBucket: { Value: "${self:custom.assetBucket}" },
      configurationsTable: {
        Value: "${self:custom.tables.configurationsTable}",
      },

      cognitoUserPoolArn: {
        Value: { "Fn::GetAtt": ["CognitoUserPool", "Arn"] },
      },
    },
  },
};

module.exports = serverlessConfiguration;
