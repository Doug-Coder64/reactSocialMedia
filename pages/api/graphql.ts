import { createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "../../graphql/schema";
import { context } from "../../graphql/context";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
const server = new ApolloServer({ schema });

export default startServerAndCreateNextHandler(server);

// export default createYoga<{
//   req: NextApiRequest;
//   res: NextApiResponse;
// }>({
//   schema,
//   context: createContext,
//   graphqlEndpoint: "/api/graphql",
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
