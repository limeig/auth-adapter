import * as sdk from "@basaldev/blocks-backend-sdk";
import { connectDb } from "../helpers";
import { Collections } from "../constant";
import { ObjectId } from 'mongodb';

class ReviewEntity extends sdk.mongo.BaseMongoEntity {
    constructor(
        public Subject?: ObjectId,
        public Child?: ObjectId,
        public hours?: number,
        public Task?: ObjectId,
        public assessment?: Array<Record<string, number>>
    ) {
        super();
    }
}

export async function get_reviews_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        let query = {
            Subject: new ObjectId(context.query["subject_id"] as string),
            Child: new ObjectId(context.query["child_id"] as string)
        };

        let db = await connectDb();
        const result = await sdk.mongo.find(logger, db, Collections.reviewCollection, query);
        return {
            data: result,
            status: 200
        };
    } catch (e) {
        console.error(e);
        return {
            data: false,
            status: 500
        };
    }
}

export async function add_review_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        let db = await connectDb();

        let review_query = {
            Task: new ObjectId(context.body["task_id"]),
        };

        const review_check = await sdk.mongo.find(
            logger,
            db,
            Collections.reviewCollection,
            review_query
        );

        if (review_check.length) {
            return {
                data: { code: "duplicate_task_review",
                        message: "Review for this task already exits" },
                status: 400
            };        
        }

        const reviewObjectEntity: ReviewEntity = new ReviewEntity(
            new ObjectId(context.body["subject_id"]),
            new ObjectId(context.body["child_id"]),
            context.body["duration"],
            new ObjectId(context.body["task_id"]),
            context.body["assessment"]
        );

        const { id } = await sdk.mongo.create(
            logger,
            db,
            Collections.reviewCollection,
            reviewObjectEntity);

        let child_id = { _id: new ObjectId(context.body["child_id"]) };

        await sdk.mongo.updateMany(
            logger,
            db,
            Collections.childrenCollection,
            child_id, {
            $addToSet: {
                Reviews: new ObjectId(id)
            }
        });

        let task_id = { _id: new ObjectId(context.body["task_id"]) };

        await sdk.mongo.updateMany(
            logger,
            db,
            Collections.taskCollection,
            task_id, { 
                $set : { Review: new ObjectId(id) }  
            }     
        );

        return {
            data: id,
            status: 200
        };
    } catch (e) {
        console.error(e);
        return {
            data: false,
            status: 500
        };
    }
}
