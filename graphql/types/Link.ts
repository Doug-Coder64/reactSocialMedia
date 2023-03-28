import { builder } from "../builder";

builder.prismaObject("Link", {
  fields: (t) => ({
    id: t.exposeID("id"),
    Url: t.exposeString("Url", { nullable: true }),
    altText: t.exposeString("altText", { nullable: true }),
    posts: t.relation("posts"),
  }),
});

builder.queryField("links", (t) =>
  t.prismaConnection({
    type: "Link",
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.link.findMany({ ...query }),
  })
);

builder.mutationField("createLink", (t) =>
  t.prismaField({
    type: "Link",
    args: {
      Url: t.arg.string({ required: true }),
      altText: t.arg.string({ required: false }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { Url, altText } = args;

      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action");
      }

      return prisma.link.create({
        ...query,
        data: {
          Url,
          altText,
        },
      });
    },
  })
);
