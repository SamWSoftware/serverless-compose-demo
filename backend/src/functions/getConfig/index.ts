import { Dynamo } from "@libs/DynamoDB";
import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {
  const tableName = process.env.configurationsTable;
  const id = event.pathParameters?.id;

  console.log("got id", id);

  const config = await Dynamo.get(id, tableName);

  return {
    statusCode: 200,
    body: JSON.stringify(config),
  };
};
