const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__v -password");
    },
    users: async () => {
      return User.find().select("-__v -password");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     const userData = await User.findOne({ _id: context.user._id }).select(
    //       "-__v -password"
    //     );

    //     return userData;
    //   }

    //   throw new AuthenticationError("Not logged in");
    // },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addBook: async (parent, { bookId, input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: bookId },
          {
            $push: {
              savedBooks: input,
            },
          },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, { bookId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "Couldn't find user with this id!" });
      }
      return res.json(updatedUser);
    },
    //   saveBook: async (parent, args, context) => {
    //     if (context.user) {
    //       User.findOneAndUpdate(
    //         { _id: args.userId },
    //         { $push: { savedBooks: { args } } },
    //         { new: true }
    //       );

    //       await User.findByIdAndUpdate(
    //         { _id: context.user._id },
    //         { $push: { savedBooks: { author: args.author } } },
    //         { new: true }
    //       );

    //       return book;
    //     }

    //     throw new AuthenticationError("You need to be logged in!");
    //   },
  },
};

module.exports = resolvers;
