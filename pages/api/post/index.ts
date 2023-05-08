import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../../lib/interfaces";
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post = req.body as Post;

  const result = await prisma.post.create({
    data: {
      title: post.title,
      content: post.content,
      author: {
        connect: {
          id: post.authorId,
        },
      },
      predecessor: {
        connect: {
          id: post.predecessorId,
        },
      },
    },
  });
  res.json(result);
}
