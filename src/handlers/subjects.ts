import * as sdk from "@basaldev/blocks-backend-sdk";
import { connectDb } from "../helpers";
import { Collections } from "../constant";

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
