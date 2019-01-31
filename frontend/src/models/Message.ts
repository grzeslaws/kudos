import { Field } from "sparkson";

export enum MessageType {
    error, succces, warning,
}

export class Message {
    constructor(
        @Field("message") public message: string,
        @Field("type") public type: MessageType,
        @Field("id", true) public id?: number,
        @Field("timeToHide", true) public timeToHide?: number,
    ) {}
}