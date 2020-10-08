const { DocumentClient } = require("aws-sdk/clients/dynamodb");

const ddb = new DocumentClient({
  convertEmptyValues: true,
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local"
  })
});

it("should insert item into table", async () => {
  await ddb.put({ TableName: "files", Item: { id: "1", hello: "world" } }).promise();

  const { Item } = await ddb.get({ TableName: "files", Key: { id: "1" } }).promise();

  expect(Item).toEqual({
    id: "1",
    hello: "world"
  });
});

it("should insert item into table 2", async () => {
  await ddb.put({ TableName: "files", Item: { id: "2", hello: "world1234" } }).promise();

  const { Item } = await ddb.get({ TableName: "files", Key: { id: "1" } }).promise();

  expect(Item).toEqual({
    id: "1",
    hello: "world"
  });
});
