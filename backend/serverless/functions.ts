const authorizer = {
  name: "authorizer",
  type: "COGNITO_USER_POOLS",
  arn: "${param:cognitoUserPoolArn}",
};

export const functions = {
  saveConfig: {
    handler: "src/functions/saveConfig/index.handler",
    events: [
      {
        http: {
          method: "post",
          path: "config",
          authorizer,
        },
      },
    ],
  },
  getConfig: {
    handler: "src/functions/getConfig/index.handler",
    events: [
      {
        http: {
          method: "get",
          path: "config/{id}",
          authorizer,
        },
      },
    ],
  },
};
