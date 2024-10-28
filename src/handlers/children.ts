import * as sdk from "@basaldev/blocks-backend-sdk";

import { connectDb } from "../helpers";
import { Collections } from "../constant";
import { ObjectId } from 'mongodb';

// class ChildEntity extends sdk.mongo.BaseMongoEntity {
//     constructor(
//         public first_name?: string,
//         public birthday?: Date,
//         public Subjects?: Array<ObjectId>,
//         public Parent?: ObjectId,
//         public Reviews?: Array<string>
//     ) {
//         super();
//     }
// }

class ChildEntity implements sdk.mongo.BaseMongoEntity {
    constructor(
        public first_name?: string,
        public birthday?: Date,
        public Subjects?: Array<ObjectId>,
        public Parent?: ObjectId,
        public Reviews?: Array<string>
    ) {
    }

    _id: ObjectId;
    createdAt: Date  = new Date();
    delFlg: 0 | 1 = 0;
    id: string;
    updatedAt: Date = new Date();
}

export async function get_child_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        console.debug("get_child_handler", JSON.stringify(context.query));
        let db = await connectDb();
        const id: string = context.query['child_id'] as string;
        const result = await sdk.mongo.find(logger, db, Collections.childrenCollection, {
            _id: new ObjectId(id)
        });
        console.log(result);
        return {
            data: {
                children: result
            },
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
            (context.body["subjects_ids"] || [])?.map((item: string) => new ObjectId(item)),
            new ObjectId(context.body["parent_id"]),
            []
        );

        let db = await connectDb();
        const { id } = await sdk.mongo.create<ChildEntity>(
            logger,
            db,
            Collections.childrenCollection,
            childObjectEntity
        );

        let parent_id = { _id: new ObjectId(context.body["parent_id"] as string) };

        await sdk.mongo.updateMany(
            logger,
            db,
            Collections.userCollection,
            parent_id,
            {
                $addToSet: { "customFields.Children": new ObjectId(id) }
            }
        );
        return {
            data: { child_id: id },
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

export async function update_child_subjects_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        let db = await connectDb();
        let child_id = { _id: new ObjectId(context.body["child_id"] as string) };

        await sdk.mongo.updateMany(
            logger,
            db,
            Collections.childrenCollection,
            child_id,
            {
                $set: { Subjects: (context.body["subjects_ids"] || [])?.map((item: string) => new ObjectId(item)) }
            }
        );
        return {
            data: true,
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
