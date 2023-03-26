//TODO write more resolvers
import prisma from "../lib/prisma";
export const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    posts: () => {
      return prisma.post.findMany();
    },
  },
};
