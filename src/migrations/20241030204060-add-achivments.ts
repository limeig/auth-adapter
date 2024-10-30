import { Collections, DATABASE_NAME } from "../constant";
import { MongoClient, ObjectId } from 'mongodb';
import { achievements } from "./lib/init-data";
import { stringToValidMongoHex } from "./helpers";

module.exports = {
  async up() {
    try {
      const client = new MongoClient(process.env.ADAPTER_DATABASE_URL);
      await client.connect();
      const db = client.db(DATABASE_NAME);

      const parsedAchievements = achievements.map((achievement) => {
        return {
         ...achievement,
         _id: new ObjectId(stringToValidMongoHex(achievement._id)),
        };
      });
      await db.collection(Collections.achievementCollection).insertMany(parsedAchievements);
    } catch (e) {
      console.log("Error during migration: ", e);
    }
  },

  async down() {
    const client = await MongoClient.connect(process.env.ADAPTER_DATABASE_UR);
    const db = client.db(DATABASE_NAME);
    
    await db.collection(Collections.achievementCollection).drop();
  }
};
