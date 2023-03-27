import { builder } from "../builder";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    email: t.exposeString("email", { nullable: false }),
    password: t.exposeString("password", { nullable: false }),
    posts: t.relation("posts"),
  }),
});

builder.queryField("users", (t) =>
  t.prismaConnection({
    type: "User",
    cursor: "id",
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.user.findMany({ ...query }),
  })
);
