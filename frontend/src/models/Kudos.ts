import { Field, ArrayField } from "sparkson";
import { User } from "./User";

export class Kudos {
    constructor(
        @ArrayField("users", User) public users: User[],
        @Field("kuid") public kuid: string,
        @Field("id") public id: number,
        @Field("description") public description: string,
        @Field("timestamp") public timestamp: number,
    ) {}
}
