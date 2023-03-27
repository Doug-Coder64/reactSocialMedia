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
