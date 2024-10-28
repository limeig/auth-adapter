import * as sdk from "@basaldev/blocks-backend-sdk";
import { connectDb } from "../helpers";
import { Collections } from "../constant";
import { base_level_minutes } from "../constant";
import { level_increase } from "../constant";
import { ObjectId } from 'mongodb';

class ChildEntity implements sdk.mongo.BaseMongoEntity {
    constructor(
        public first_name?: string,
        public birthday?: Date,
        public Subjects?: Array<ObjectId>,
        public Parent?: ObjectId,
        public Reviews?: Array<string> | undefined
    ) {
    }

    _id: ObjectId;
    createdAt: Date  = new Date();
    delFlg: 0 | 1 = 0;
    id: string;
    updatedAt: Date = new Date();
}

class ReviewEntity implements sdk.mongo.BaseMongoEntity {

    constructor(
        public Subject?: ObjectId,
        public Child?: ObjectId,
        public hours?: string,
        public Task?: ObjectId,
        public Assessment?: Array<string> | undefined
    ) {
    }
    _id: ObjectId;
    createdAt: Date  = new Date();
    delFlg: 0 | 1 = 0;
    id: string;
    updatedAt: Date = new Date();
}



function convert_minutes_into_level( minutes:number):number {
    let b = 2*(base_level_minutes+level_increase)
    let D = b*b + 8*level_increase*minutes
    let level = (-b+Math.sqrt(D))/(2*level_increase)
    return level;
}

class TaskEntity implements sdk.mongo.BaseMongoEntity {
    constructor(
        public Child?: ObjectId,
        public Subject?: ObjectId,
        public isCompleted?: boolean,
        public isActive?: boolean,
        public Review?: ObjectId
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

export async function get_subjects_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        console.debug("get_subjects_handler", JSON.stringify(context.query));
        let db = await connectDb();

        const result = await sdk.mongo.aggregate(logger, db, Collections.subjectCollection, [
            {
                $lookup:
                {
                    from: Collections.categoryCollection,
                    localField: 'category',
                    foreignField: '_id',
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
            (context.body["subjects_ids"] || [])?.map((item: string) => new ObjectId(item)),
            new ObjectId(context.body["parent_id"]),
            undefined
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
        const reviewObjectEntity: ReviewEntity = new ReviewEntity(
            new ObjectId(context.body["subject_id"]),
            new ObjectId(context.body["child_id"]),
            context.body["duration"],
            new ObjectId(context.body["task_id"]),
            undefined
        );

        let db = await connectDb();
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

export async function add_task_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        let db = await connectDb();
        let query = {
            Child: new ObjectId(context.body["child_id"] as string),
            Subjects: new ObjectId(context.body["subject_id"])
        };

        const result = await sdk.mongo.find(
            logger,
            db,
            Collections.childrenCollection,
            query
        );

        if (!result.length) {
            return {
                data: { code: "wrong_child_subject",
                        message: "Child does not have such subject" },
                status: 400
            };        
        }

        const taskEntity: TaskEntity = new TaskEntity(
            new ObjectId(context.body["child_id"]),
            new ObjectId(context.body["subject_id"]),
            context.body["is_completed"],
            true,
            undefined
        );

        const { id } = await sdk.mongo.create(
            logger,
            db,
            Collections.taskCollection,
            taskEntity);
        return {
            data: { task_id: id },
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

export async function complete_task_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        let db = await connectDb();
        let task_id = { _id: new ObjectId(context.body["task_id"]) };

        await sdk.mongo.updateMany(
            logger,
            db,
            Collections.taskCollection,
            task_id, {
            $set: {
                isCompleted: true
            }
        });

        return {
            data: { task_id: task_id._id },
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

export async function deactivate_task_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        let db = await connectDb();
        let task_id = { _id: new ObjectId(context.body["task_id"]) };

        await sdk.mongo.updateMany(
            logger,
            db,
            Collections.taskCollection,
            task_id, {
            $set: {
                isActive: false
            }
        });

        return {
            data: { task_id: task_id._id },
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

export async function complete_active_tasks_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        let db = await connectDb();
        let query = {
            Child: new ObjectId(context.body["child_id"] as string),
            isActive: true
        };

        const number = await sdk.mongo.updateMany(
            logger,
            db,
            Collections.taskCollection,
            query, {
            $set: {
                isCompleted: true,
                isActive: false
            }
        });
        return {
            data: { tasks_completed: number },
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

export async function get_tasks_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        let db = await connectDb();
        let query = { Child: new ObjectId(context.query["child_id"] as string) } as any;

        if (context.query["is_active"])
            query.isActive = context.query["is_active"]

        if (context.query["subject_id"])
            query.Subject = new ObjectId(context.query["subject_id"] as string)

        const result = await sdk.mongo.find(
            logger,
            db,
            Collections.taskCollection,
            query
        );
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

export async function get_level_for_subject_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        console.debug("get_level_for_subject_handler", JSON.stringify(context.query));
        let db = await connectDb();
        let query = {
            Child: new ObjectId(context.body["child_id"] as string),
            Subjects: new ObjectId(context.body["subject_id"])
        };
        const result = await sdk.mongo.find(
            logger,
            db,
            Collections.subjectTimeCollection,
            query
        );


        if (!result.length) {
            return {
                data: { code: "wrong_subjectTime",
                        message: "Child does not have such subject" },
                status: 400
            };        
        }
        return {
            data: convert_minutes_into_level(result),
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


export async function add_time_for_subject_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        //todo: I should create a function which initialize subjectTime table
        console.debug("add_time_for_subject_handler", JSON.stringify(context.query));
        let db = await connectDb();
        let query = {
            Child: new ObjectId(context.body["child_id"] as string),
            Subjects: new ObjectId(context.body["subject_id"])
        };
        let duration = context.body["duration"];
        let old_value = get_level_for_subject_handler(logger,context)
        const number = await sdk.mongo.updateMany(
            logger,
            db,
            Collections.taskCollection,
            query, {
            $set: {
                time_m: old_value + duration
            }
        });

        return {
            data: { tasks_completed: number },
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
