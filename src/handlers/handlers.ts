import * as sdk from "@basaldev/blocks-backend-sdk";

const userCollection = 'users';
const childrenCollection = 'children';
const categoryCollection = 'category';
const subjectCollection = 'subjects';
const reviewCollection = 'review';

class ChildEntity extends sdk.mongo.BaseMongoEntity {
    constructor(
        public first_name?: string,
        public birthday?: string,
        public Subjects?: Array<string>,
        public Parent?: string,
        public Reviews?: Array<string> | undefined
    ) {
        super();
    }
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

export async function get_children_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext, db: sdk.mongo.Db | string): Promise<{
    data: any,
    status: number
}> {
    if (typeof db === 'string')
        return;

    try {
        let query = {
            Parent: context.body["parent_id"]
        };

        const result = sdk.mongo.find(logger, db, categoryCollection, { Parent: context.body["parent_id"] });

        return {
            data: result,
            status: 200
        };
    } catch (e) {
        console.error(e);
    }
    return {
        data: undefined,
        status: 500
    };
}

export async function get_subjects_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext, db: sdk.mongo.Db | string): Promise<{
    data: any,
    status: number
}> {
    if (typeof db === 'string')
        return;

    try {
        const result = sdk.mongo.aggregate(logger, db, subjectCollection, [
            { $lookup:
                {
                   from: categoryCollection,
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
    }
    return {
        data: undefined,
        status: 500
    };
}

export async function create_child_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext, db: sdk.mongo.Db | string): Promise<{
    data: any,
    status: number
}> {
    if (typeof db === 'string')
        return;

    try {
        const childObjectEntity: ChildEntity = new ChildEntity(
            context.body["child_first_name"],
            context.body["child_birthday"],
            context.body["subjects_ids"],
            context.body["parent_id"],
            undefined
        );

        const { id } = await sdk.mongo.create<ChildEntity>(
            logger,
            db,
            childrenCollection,
            childObjectEntity
        );

        let parent_id = { id: context.body["parent_id"] };

        await sdk.mongo.updateMany(
            logger,
            db,
            userCollection,
            parent_id,
            {
                $addToSet: {
                    Children: id
                }
            }
        );
    } catch (e) {
        console.error(e);
    }
    return {
        data: undefined,
        status: 200
    };
}

export async function get_reviews_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext, db: sdk.mongo.Db | string): Promise<{
    data: any,
    status: number
}> {
    if (typeof db === 'string')
        return;
    
    try {
        let query = {
            Subject: context.body["subject_id"],
            Child: context.body["child_id"]
        };

        const result = await sdk.mongo.find(logger, db, reviewCollection, query);
        return {
            data: result,
            status: 200
        };
    } catch (e) {
        console.error(e);
    }
    return {
        data: undefined,
        status: 500
    };
}

export async function add_review_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext, db: sdk.mongo.Db | string): Promise<{
    data: any,
    status: number
}> {
    if (typeof db === 'string')
        return;
    
    try {
        const reviewObjectEntity: ReviewEntity = new ReviewEntity(
            context.body["date"],
            context.body["subject_id"],
            context.body["hours"],
            context.body["child_id"],
            undefined
        );
        
        const id = await sdk.mongo.create(
            logger,
            db,
            reviewCollection,
            reviewObjectEntity);

        let child_id = { id: context.body["child_id"] };

        await sdk.mongo.updateMany(
            logger,
            db,
            childrenCollection,
            child_id, {
            $addToSet: {
                Reviews: id
            }
        });
    } catch (e) {
        console.error(e);
    }
    return {
        data: undefined,
        status: 200
    };
}
