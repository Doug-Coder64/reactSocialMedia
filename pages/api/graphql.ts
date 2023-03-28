import { createYoga } from "graphql-yoga";
import type { NextApiHandler, NextApiResponse } from "next";
import { schema } from "../../graphql/schema";

export default createYoga<{
  req: NextApiHandler;
  res: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
});

export const config = {
  api: {
    bodyParser: false,
  },
};
