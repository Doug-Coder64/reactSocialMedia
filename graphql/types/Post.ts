import { builder } from "../builder";

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title", { nullable: true }),
    content: t.exposeString("content"),
    authorId: t.exposeInt("authorId"),
    author: t.relation("author"),
    successorId: t.exposeInt("successorId", { nullable: true }),
    successor: t.relation("successor", { nullable: true }),
    predecessor: t.relation("predecessor", { nullable: true }),
    published: t.exposeBoolean("published"),
    createdAt: t.field({ type: "Date", resolve: (post) => post.createdAt }),
    imageLinkId: t.exposeInt("imageLinkId", { nullable: true }),
    imageLink: t.relation("imageLink", { nullable: true }),
  }),
});
