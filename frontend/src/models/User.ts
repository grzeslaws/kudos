import { Field } from "sparkson";

export class User {
    constructor(
        @Field("id") public id: number,
        @Field("uuid") public uuid: string,
        @Field("kudos_received") public kudosReceived: number,
        @Field("kudos_given") public kudosGiven: number,
        @Field("display_name", true) public displayName?: string,
        @Field("image", true) public image?: string,
        @Field("name", true) public name?: string,
        @Field("email", true) public email?: string,
    ) {}
}



