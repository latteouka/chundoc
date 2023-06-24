import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user, content, name } = req.body;
    process.env.TZ = "Asia/Taipei";

    if (content.includes("damn")) {
      return res.status(400).send({ error: "no dirty words!" });
    }

    await prisma.discuss.create({
      data: {
        user,
        content,
        name,
      },
    });

    const start = new Date(new Date(new Date().toLocaleDateString()).getTime());

    const end = new Date(
      new Date(new Date().toLocaleDateString()).getTime() +
        24 * 60 * 60 * 1000 -
        1
    );

    const comments = await prisma.discuss.findMany({
      where: { createdAt: { gt: start, lt: end } },
    });

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ comments });
  } else {
    // Handle any other HTTP method
    return res.status(200).json({ status: "Please send with POST method." });
  }
}
