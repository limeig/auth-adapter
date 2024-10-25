import * as sdk from "@basaldev/blocks-backend-sdk";

export async function connectDb(): Promise<sdk.mongo.Db> {
  globalThis.db = await sdk.mongo.singletonMongoConn(process.env.ADAPTER_DATABASE_URL);
  console.info("Type of db after singleton: ", typeof globalThis.db);
  return globalThis.db;
}
