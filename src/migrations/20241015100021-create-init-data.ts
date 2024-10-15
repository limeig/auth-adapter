import { Collections, DATABASE_NAME } from "../constant";
import {MongoClient, ObjectId} from 'mongodb';
import { categories, subjects } from "./lib/init-data";

module.exports = {
  async up() {
    try {
      console.log('DB URL', process.env.ADAPTER_DATABASE_UR)
      const client = new MongoClient(process.env.ADAPTER_DATABASE_UR);
      await client.connect();
      const db = client.db(DATABASE_NAME);
      console.log('PING', await db.command({ ping: 1 }));

      const parsedCategories = categories.map((category) => {
        return {
          _id: new ObjectId(category.id),
          ...category,
        };
      });
      await db.collection(Collections.categoryCollection).insertMany(parsedCategories);

      const parsedSubjects = subjects.map((subject) => {
        return {
          _id: new ObjectId(subject.id),
          category: subject.category.map((category) => new ObjectId(category)),
          ...subject,
        };
      });
      await db.collection(Collections.subjectCollection).insertMany(parsedSubjects);
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
