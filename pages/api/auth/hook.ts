import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, secret } = req.body;

  if (req.method !== "POST") {
    return res.status(403).json({ message: "Method not allowed" });
  }
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }
  if (email) {
    if ((await prisma.user.count({ where: { email: email } })) > 0) {
      return res.status(200).json({
        message: `User exists!`,
      });
    }
    await prisma.user.create({
      data: { name, email },
    });
    return res.status(200).json({
      message: `User with name ${name} and email: ${email} has been created successfully!`,
    });
  }
};

export default handler;
