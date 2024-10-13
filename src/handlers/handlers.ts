import * as sdk from "@basaldev/blocks-backend-sdk";
import { connectDb } from "../helpers";
import { Collections } from "../constant";
import { ObjectId } from 'mongodb';

class ChildEntity implements sdk.mongo.BaseMongoEntity {
    constructor(
        public first_name?: string,
        public birthday?: string,
        public Subjects?: Array<string>,
        public Parent?: string,
        public Reviews?: Array<string> | undefined
    ) {
    }
    
    _id: ObjectId; 
    createdAt: Date; 
    delFlg: 0 | 1; 
    id: string; 
    updatedAt: Date; 
}

class ReviewEntity extends sdk.mongo.BaseMongoEntity {
    constructor(
        public date?: string,
        public Subject?: string,
        public Child?: string,
        public hours?: string,
        public Asessment?: Array<string> | undefined
    ) {
        super();
    }
}

export async function get_children_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        await connectDb();
        const result = await sdk.mongo.find(logger, globalThis.db, Collections.childrenCollection, { Parent: context.body["parent_id"] });
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

export async function get_subjects_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        await connectDb();
        const result = await sdk.mongo.aggregate(logger, globalThis.db, Collections.subjectCollection, [
            { $lookup:
                {
                   from: Collections.categoryCollection,
                   localField: 'category_id',
                   foreignField: 'id',
                   as: 'category'
                }
            }
        ]);

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

export async function create_child_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        const childObjectEntity: ChildEntity = new ChildEntity(
            context.body["child_first_name"],
            context.body["child_birthday"],
            context.body["subjects_ids"],
            context.body["parent_id"],
            undefined
        );

        await connectDb();
        const { id } = await sdk.mongo.create<ChildEntity>(
            logger,
            globalThis.db,
            Collections.childrenCollection,
            childObjectEntity
        );

        let parent_id = { id: context.body["parent_id"] };

        await sdk.mongo.updateMany(
            logger,
            globalThis.db,
            Collections.userCollection,
            parent_id,
            {
                $addToSet: {
                    Children: id
                }
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
            status: 200
        };
    }
}

export async function get_reviews_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {  
    try {
        let query = {
            Subject: context.body["subject_id"],
            Child: context.body["child_id"]
        };

        await connectDb();
        const result = await sdk.mongo.find(logger, globalThis.db, Collections.reviewCollection, query);
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
        const reviewObjectEntity: ReviewEntity = new ReviewEntity(
            context.body["date"],
            context.body["subject_id"],
            context.body["duration"],
            context.body["child_id"],
            undefined
        );
        
        await connectDb();
        const id = await sdk.mongo.create(
            logger,
            globalThis.db,
            Collections.reviewCollection,
            reviewObjectEntity);

        let child_id = { id: context.body["child_id"] };

        await sdk.mongo.updateMany(
            logger,
            globalThis.db,
            Collections.childrenCollection,
            child_id, {
            $addToSet: {
                Reviews: id
            }
        });
        return {
            data: id,
            status: 200
        };
    } catch (e) {
        console.error(e);
        return {
            data: false,
            status: 200
        };
    }
}
