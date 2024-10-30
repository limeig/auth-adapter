//todo: pass as env.process
export const DATABASE_NAME = 'izumo1_mvp';

export namespace Collections {
export const userCollection = 'users';
export const childrenCollection = 'children';
export const categoryCollection = 'category';
export const subjectCollection = 'subjects';
export const reviewCollection = 'review';
export const taskCollection = 'task';
export const subjectTimeCollection = "SubjectTime";
export const base_level_minutes = 5*60;
export const level_100_equivalent = 1000*60
export const level_increase = (level_100_equivalent/100-base_level_minutes)/50;
}