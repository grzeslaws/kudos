import { ArrayField, Field } from "sparkson";
import { Kudos } from "./Kudos";

export class KudosList {
    constructor(
        @ArrayField("kudos", Kudos) public kudosList: Kudos[],
        @Field("has_prev", true) public hasPrev?: boolean,
        @Field("next_num", true) public nextNum?: number,
        @Field("pages", true) public pages?: number,
        @Field("prev_num", true) public prevNum?: number,
    ) {}
}
