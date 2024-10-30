import * as sdk from "@basaldev/blocks-backend-sdk";
import { connectDb } from "../helpers";
import { Collections } from "../constant";

export async function get_achievements_handler(logger: sdk.Logger, context: sdk.adapter.AdapterHandlerContext): Promise<{
    data: any,
    status: number
}> {
    try {
        let db = await connectDb();
        const result = await sdk.mongo.aggregate(
            logger,
            db,
            Collections.achievementCollection,
            []
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