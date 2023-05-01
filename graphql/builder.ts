import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import { DateResolver } from "graphql-scalars";
import RelayPlugin from "@pothos/plugin-relay";
import { createContext } from "./context";
import DirectivePlugin from "@pothos/plugin-directives";
import FederationPlugin from "@pothos/plugin-federation";

export const builder = new SchemaBuilder<{
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaUtils, PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
  },
});

builder.addScalarType("DateTime", DateResolver, {});

builder.queryType();
builder.mutationType();

// builder.queryType({
//   fields: (t) => ({
//     ok: t.boolean({
//       resolve: () => true,
//     }),
//   }),
// });
