import { mergeTypeDefs } from "@graphql-tools/merge";
import eventType from "./event.type.js";
import userType from "./user.type.js";

const typesArray = [eventType, userType];

export default mergeTypeDefs(typesArray);
