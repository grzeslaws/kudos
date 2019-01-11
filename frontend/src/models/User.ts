import { Field } from "sparkson";

export class User {
    constructor(
        @Field("id") public id: number,
        @Field("uuid") public uuid: string,
        @Field("kudos_number") public kudosNumber: number,
        @Field("first_name", true) public firstName?: string,
        @Field("last_name", true) public lastName?: string,
        @Field("nick", true) public nick?: string,
        @Field("email", true) public email?: string,
    ) {}
}