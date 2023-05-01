import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../lib/prisma";
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";

// export type Context = {
//   user: any;
//   accessToken: string | undefined | null;
//   prisma: PrismaClient;
// };

export interface Context {
  user: any;
  prisma: PrismaClient;
  accessToken: string | undefined | null;
}

export function context(): Context {
  return { user: null, accessToken: null, prisma: prisma };
}

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  const session = await getSession(req, res);

  // if the user is not logged in, return an empty object
  if (session) {
    const { user, accessToken } = session;
    return {
      user,
      accessToken,
      prisma,
    };
  } else return { user: null, accessToken: null, prisma: prisma };
}
