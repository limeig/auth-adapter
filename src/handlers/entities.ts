import * as sdk from "@basaldev/blocks-backend-sdk";
import { ObjectId } from 'mongodb';

export class ChildEntity extends sdk.mongo.BaseMongoEntity {
    constructor(
        public first_name?: string,
        public birthday?: Date,
        public age?: number,
        public Subjects?: Array<ObjectId>,
        public Parent?: ObjectId,
        public Reviews?: Array<string>,
        public levels?: Map<string, number>
    ) {
        super();
    }
}
export class ReviewEntity extends sdk.mongo.BaseMongoEntity {
    constructor(
        public Subject?: ObjectId,
        public Child?: ObjectId,
        public hours?: number,
        public Task?: ObjectId,
        public assessment?: Map<string, number>
    ) {
        super();
    }
}