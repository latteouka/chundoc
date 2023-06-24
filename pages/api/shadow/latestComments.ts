import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  process.env.TZ = "Asia/Taipei";

  const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
  console.log(start);

  const end = new Date(
    new Date(new Date().toLocaleDateString()).getTime() +
      24 * 60 * 60 * 1000 -
      1
  );
  console.log(end);

  const comments = await prisma.discuss.findMany({
    where: { createdAt: { gt: start, lt: end } },
  });

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ comments });
}
