import { builder } from "../builder";

builder.prismaObject("Link", {
  fields: (t) => ({
    id: t.exposeID("id"),
    Url: t.exposeString("Url", { nullable: true }),
    altText: t.exposeString("altText", { nullable: true }),
    posts: t.relation("posts"),
  }),
});

