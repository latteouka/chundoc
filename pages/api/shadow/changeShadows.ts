import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  process.env.TZ = "Asia/Taipei";

  const start = new Date("2022-08-31T00:00:00");
  console.log(start.toLocaleString("zh-TW", { hour12: false }));

  const now = new Date();
  const end = new Date(now.setDate(now.getDate() + 1));
  console.log(end.toLocaleString("zh-TW"));

  const shadows = await prisma.shadow.findMany({
    where: { due: { gt: start, lt: end } },
    orderBy: { due: "desc" },
  });

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ shadows });
}
