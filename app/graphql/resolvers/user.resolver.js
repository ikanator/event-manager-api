import { UserController } from "../../controllers/user.controller";

const User = new UserController();

const resolver = {
  Query: {
    currentUser: async (_, {}, context) => {
      if (!context.userId) {
        throw new Error("User is not logged in");
      }

      const user = await User.getById({ id: context.userId });

      return user;
    },
  },
  Mutation: {
    signup: async (_, { input }, context) => {
      const { user, token } = await User.signup(input, context);
      return { token };
    },
    signin: async (_, { input }, context) => {
      const { user, token } = await User.signin(input, context);
      return { token };
    },
  },
};

export default resolver;
