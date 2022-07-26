const { Manager, Queue, Customer } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    manager: async () => {
      return Manager.find();
    },
    queue: async () => {
      return Queue.find().populate("customers");
    },
    customer: async (parent, { queueId }) => {
      const params = queueId ? { queueId } : {};
      return Customer.find(params).sort({ createdAt: -1 });
    },
  },

  Mutation: {
    managerLogin: async (parent, { email, password }) => {
      const user = await Manager.findOne({ email });

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
  },
};

module.exports = resolvers;
