import * as sdk from "@basaldev/blocks-backend-sdk";
import { connectDb } from "../helpers";
import { Collections } from "../constant";
import { ObjectId } from 'mongodb';
import { ChildEntity } from '../handlers/entities'

export const complete_day = 'First Day Completed';
export const complete_task = 'Task Master';
export const reach_level_5 = 'Champion'
export const reach_level_10 = 'Level 10 Achiever'
export const reach_level_20 = 'Level 20 Expert'

export async function check_first_day_achievement(logger: sdk.Logger, child_id: ObjectId): Promise<boolean> {
    return check_achievement(logger, child_id, complete_day);
}

export async function check_first_task_achievement(logger: sdk.Logger, child_id: ObjectId): Promise<boolean> {
    return check_achievement(logger, child_id, complete_task);
}

async function check_level(logger: sdk.Logger, child_id: ObjectId, level: number): Promise<boolean> {
    let db = await connectDb();

    const children: ChildEntity[] = await sdk.mongo.find(
        logger,
        db,
        Collections.childrenCollection,
        { _id: child_id }
    );

    const childLevel = new Map(Object.entries(children[0].levels || {}))

    let achieved: boolean = false;

    childLevel.forEach((sub_level: number, id: string) => {
        if (sub_level >= level) {
            achieved = true;
            return;
        }
    })
    
    return achieved;
}

export async function check_level_achievements(logger: sdk.Logger, child_id: ObjectId): Promise<boolean> {
    const [res1, res2, res3] = await Promise.all([check_level_5_achievement(logger, child_id), 
                                                 check_level_10_achievement(logger, child_id),
                                                 check_level_20_achievement(logger, child_id)]);

    return res1 || res2 || res3;
}

async function check_level_5_achievement(logger: sdk.Logger, child_id: ObjectId): Promise<boolean> {
    if (await check_level(logger, child_id, 5))
        return check_achievement(logger, child_id, reach_level_5);

    return false;
}

async function check_level_10_achievement(logger: sdk.Logger, child_id: ObjectId): Promise<boolean> {
    if (await check_level(logger, child_id, 10))
        return check_achievement(logger, child_id, reach_level_10);

    return false
}

async function check_level_20_achievement(logger: sdk.Logger, child_id: ObjectId): Promise<boolean> {
    if (await check_level(logger, child_id, 20))
        return check_achievement(logger, child_id, reach_level_20);

    return false
}

async function check_achievement(logger: sdk.Logger, child_id: ObjectId, achievement_name: string): Promise<boolean> {
    try {
        let db = await connectDb();

        const child: ChildEntity[] = await sdk.mongo.find(
            logger,
            db,
            Collections.childrenCollection,
            { _id: child_id }
        );

        const achievements = await sdk.mongo.aggregate(
            logger,
            db,
            Collections.achievementCollection,
            [            {
                $match: {
                    name: { $eq: achievement_name }
                },
            }]
        );

        if (!achievements.length){
            console.error("Achievement ", achievement_name, " not found");
            return false;
        }

        console.log(achievements);
        const childAchievements = new Map(Object.entries(child[0].Achievements || {}))
        const id = new ObjectId(achievements[0]._id)?.toString();
        if (childAchievements.get(id))
        {
            console.log("Achievement ", achievement_name, " already set");
            return false;
        }

        childAchievements.set(id, true);
        await sdk.mongo.updateMany(
            logger,
            db,
            Collections.childrenCollection,
            { _id: child_id },
            {
                $set: {
                    Achievements: childAchievements
                }

            });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

