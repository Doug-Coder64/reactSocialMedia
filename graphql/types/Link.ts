import { builder } from "../builder";

builder.prismaNode("Link", {
  id: { field: "id" },
  fields: (t) => ({
    Url: t.exposeString("Url", { nullable: true }),
    altText: t.exposeString("altText", { nullable: true }),
    posts: t.relation("posts"),
  }),
});

builder.queryField("links", (t) =>
  t.prismaConnection({
    type: "Link",
    cursor: "id",
    resolve: async (query, root, args, ctx, info) => {
      return prisma.link.findMany({ ...query });
    },
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
