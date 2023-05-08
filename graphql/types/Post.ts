import { builder } from "../builder";

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title", { nullable: true }),
    content: t.exposeString("content"),
    authorId: t.exposeInt("authorId"),
    author: t.relation("author"),
    predecessorId: t.exposeInt("predecessorId", { nullable: true }),
    predecessor: t.relation("predecessor", { nullable: true }),
    successor: t.relation("successor", { nullable: true }),
    published: t.exposeBoolean("published"),
    createdAt: t.field({ type: "DateTime", resolve: (post) => post.createdAt }),
    imageLinkId: t.exposeInt("imageLinkId", { nullable: true }),
    imageLink: t.relation("imageLink", { nullable: true }),
  }),
});

// builder.queryType({
//   fields: (t) => ({
//     me: t.prismaField({
//       type: "Post",
//       resolve: async (query, root, arg, ctx, info) =>
//         prisma.post.findUniqueOrThrow({ ...query, where: { id: arg.id } }),
//     }),
//   }),
// });

builder.queryFields((t) => ({
  post: t.prismaField({
    type: "Post",
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, _parent, _args, _ctx, _info) => {
      const id = _args.id;

      return prisma.post.findUniqueOrThrow({
        ...query,
        where: { id },
      });
    },
  }),
}));

builder.mutationFields((t) => ({}));
