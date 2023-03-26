import prisma from "../lib/prisma";
export const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    posts: () => {
      prisma.post.findMany();
    },
    links: () => {
      prisma.link.findMany();
    },
  },
};
