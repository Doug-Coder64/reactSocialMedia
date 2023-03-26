import { createYoga } from "graphql-yoga";
import type { NextApiHandler, NextApiResponse } from "next";
import { schema } from "../../graphql/schema";

//TODO write graphql-yoga API endpoint stuff
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
