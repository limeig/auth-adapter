import * as sdk from "@basaldev/blocks-backend-sdk";

import { connectDb } from "../helpers";
import { Collections } from "../constant";
import { ObjectId } from 'mongodb';

class TaskEntity extends sdk.mongo.BaseMongoEntity {
    constructor(
        public Child?: ObjectId,
        public Subject?: ObjectId,
        public isCompleted?: boolean,
        public isActive?: boolean,
        public Review?: ObjectId
    ) {
        super();
    }
}

export async function add_task_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        let db = await connectDb();

        let subject_query = {
            _id: new ObjectId(context.body["child_id"]),
            Subjects: new ObjectId(context.body["subject_id"])
        };

        const subject_check = await sdk.mongo.find(
            logger,
            db,
            Collections.childrenCollection,
            subject_query
        );

        if (!subject_check.length) {
            return {
                data: { code: "wrong_child_subject",
                        message: "Child does not have such subject" },
                status: 400
            };        
        }

        let task_query = {
            Child: new ObjectId(context.body["child_id"]),
            Subject: new ObjectId(context.body["subject_id"]),
            isActive: true
        };

        const task_check = await sdk.mongo.find(
            logger,
            db,
            Collections.taskCollection,
            task_query
        );

        if (task_check.length) {
            return {
                data: { code: "subject_task_exists",
                        message: "Child already has active task for the subject" },
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
        let query = { 
            Child: new ObjectId(context.query["child_id"] as string), 
            isActive: true 
        } as any;

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
