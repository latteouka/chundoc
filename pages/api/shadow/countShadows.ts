import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  process.env.TZ = "Asia/Taipei";

  const start = new Date("2022-09-01T00:00:00");

  const now = new Date();
  const end = new Date(now.setDate(now.getDate() + 1));

  const shadows = await prisma.shadow.findMany({
    where: { due: { gt: start, lt: end } },
    orderBy: { due: "desc" },
  });

  const filterShadows = shadows.filter(
    (item) => !item.title.includes("Challenge")
  );

  const count = filterShadows.length;

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ count });
}
