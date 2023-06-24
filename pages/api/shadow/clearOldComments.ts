import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=60"
  );

  const start = new Date(new Date(new Date().toLocaleDateString()).getTime()); // 当天0点

  const comments = await prisma.discuss.deleteMany({
    where: { createdAt: { lt: start } },
  });

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ comments });
}
