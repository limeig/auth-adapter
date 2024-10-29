import { Collections, DATABASE_NAME } from "../constant";
import { MongoClient, ObjectId } from 'mongodb';
import { criteria } from "./lib/init-data";
import { stringToValidMongoHex } from "./helpers";

module.exports = {
  async up() {
    try {
      const client = new MongoClient(process.env.ADAPTER_DATABASE_URL);
      await client.connect();
      const db = client.db(DATABASE_NAME);

      const parsedAssessment = criteria.map((criterion) => {
        return {
          _id: new ObjectId(stringToValidMongoHex(criterion.id)),
          name: criterion.name,
          description: criterion.description,
          1 : criterion[1],
          2 : criterion[2],
          3 : criterion[3],
          4 : criterion[4],
          5 : criterion[5],
          6 : criterion[6],
        };
      });
      await db.collection(Collections.criteriaCollection).insertMany(parsedAssessment);
    } catch (e) {
      console.log("Error during migration: ", e);
    }
  },

  async down() {
    const client = await MongoClient.connect(process.env.ADAPTER_DATABASE_UR);
    const db = client.db(DATABASE_NAME);
    
    await db.collection(Collections.criteriaCollection).drop();
  }
};
