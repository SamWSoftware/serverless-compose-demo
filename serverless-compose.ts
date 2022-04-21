const serverlessCompose = {
  services: {
    infra: {
      path: "infra",
    },

    backend: {
      path: "backend",
      params: {
        region: "${infra.region}",

        assetBucket: "${infra.assetBucket}",
        configurationsTable: "${infra.configurationsTable}",
        cognitoUserPoolArn: "${infra.cognitoUserPoolArn}",
      },
      dependsOn: ["infra"],
    },
    frontend: {
      path: "frontend",
      params: {
        region: "${infra.region}",

        websiteBucket: "${infra.websiteBucket}",
        assetBucket: "${infra.assetBucket}",
        cognitoUserPoolArn: "${infra.cognitoUserPoolArn}",

        apiUrl: "${backend.apiUrl}",
      },
      dependsOn: ["infra", "backend"],
    },
  },
};

module.exports = serverlessCompose;
