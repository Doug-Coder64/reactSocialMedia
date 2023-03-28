import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import prisma from "../lib/prisma";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import { DateResolver } from "graphql-scalars";
import RelayPlugin from "@pothos/plugin-relay";
import { createContext } from "../graphql/context";

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
  PrismaTypes: PrismaTypes;
  Context: ReturnType<typeof createContext>;
}>({
  plugins: [PrismaPlugin, PrismaUtils, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: prisma,
  },
});

builder.addScalarType("Date", DateResolver, {});
builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.mutationType({});
