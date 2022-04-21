import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "frontend",
  frameworkVersion: "3",
  plugins: ["serverless-scriptable-plugin", "serverless-s3-sync"],
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
    },
  },

  custom: {
    scriptable: {
      hooks: {
        "before:package:createDeploymentArtifacts":
          "cd react-app && npm run build && cd ../",
      },
    },

    s3Sync: [
      {
        bucketName: "${param:websiteBucket}",
        localDir: "react-app/build",
      },
    ],

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
};

module.exports = serverlessConfiguration;
