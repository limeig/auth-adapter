import * as sdk from "@basaldev/blocks-backend-sdk";

export async function connectDb() {
  console.info("Type of db before singleton: ", typeof globalThis.db);

  if (typeof globalThis.db !== 'undefined')
    return;

  globalThis.db = await sdk.mongo.singletonMongoConn(process.env.ADAPTER_DATABASE_URL);
  console.info("Type of db after singleton: ", typeof globalThis.db);
}
