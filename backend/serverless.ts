import type { AWS } from "@serverless/typescript";

import { functions } from "./serverless/functions";

const serverlessConfiguration: AWS = {
  service: "backend",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    //@ts-expect-error
    region: "${param:region}",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",

      configurationsTable: "${param:configurationsTable}",
      assetBucket: "${param:assetBucket}",
    },
  },
  // import the function via paths
  functions,
  package: { individually: true },
  custom: {
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
    Outputs: {
      apiUrl: {
        Value: {
          "Fn::Join": [
            "",
            [
              "https://",
              { Ref: "ApiGatewayRestApi" },
              ".execute-api.",
              "${self:provider.region}",
              ".amazonaws.com/",
              "${sls:stage}",
            ],
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
