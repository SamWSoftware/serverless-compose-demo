import { Dynamo } from "@libs/DynamoDB";
import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {
  const tableName = process.env.configurationsTable;

  const data = JSON.parse(event.body);

  const config = await Dynamo.get(data, tableName);

  return {
    statusCode: 200,
    body: JSON.stringify(config),
  };
};
