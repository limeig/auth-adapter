import { DATABASE_NAME } from "../constant";
import {MongoClient, ObjectId} from 'mongodb';
import { categories, subjects } from "./lib/init-data";

module.exports = {
  async up() {
    try {
      const client = await MongoClient.connect(process.env.ADAPTER_DATABASE_UR);
      const db = client.db(DATABASE_NAME);

      const parsedCategories = categories.map((category) => {
        return {
          _id: new ObjectId(category.id),
          ...category,
        };
      });
      await db.collection('categories').insertMany(parsedCategories);

      const parsedSubjects = subjects.map((subject) => {
        return {
          _id: new ObjectId(subject.id),
          ...subject,
        };
      });
      await db.collection('subjects').insertOne(parsedSubjects);

      console.log("Migrated successfully");
    } catch (e) {
      console.log("Error during migration: ", e);
    }
  },

  async down() {
    const client = await MongoClient.connect(process.env.ADAPTER_DATABASE_UR);
    const db = client.db(DATABASE_NAME);
    
    await db.collection('categories').drop();
    await db.collection('subjects').drop();
  }
};
