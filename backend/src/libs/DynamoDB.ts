import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  PutCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

const ddbClient = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(ddbClient);

export const Dynamo = {
  get: async (id: string, tableName: string) => {
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };
    const res = await documentClient.send(new GetCommand(params));

    return res.Item;
  },

  write: async (data: any, tableName: string) => {
    const params: PutCommandInput = {
      TableName: tableName,
      Item: {
        ...data,
        id: uuid(),
      },
    };
    await documentClient.send(new PutCommand(params));

    return params.Item;
  },
};
