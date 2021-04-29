import { mergeResolvers } from "@graphql-tools/merge";
import eventResolver from "./event.resolver";
import userResolver from "./user.resolver";

const resolvers = [eventResolver, userResolver];

export default mergeResolvers(resolvers);
