import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  process.env.TZ = "Asia/Taipei";

  // const start = new Date("2022-09-01T00:00:00");
  // console.log(start.toLocaleString("zh-TW", { hour12: false }));

  // const end = new Date("2022-10-01T00:00:00");
  // console.log(end.toLocaleString("zh-TW"));

  const shadows = [];
  const latest = await prisma.shadow.findMany({
    where: { due: { gt: new Date() } },
    orderBy: { due: "asc" },
  });
  const trials = await prisma.shadow.findMany({
    where: {
      OR: [{ id: 104 }, { id: 105 }],
    },
    orderBy: { due: "desc" },
  });

  shadows.push(latest[0]);
  shadows.push(...trials);

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ shadows });
}
