import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  process.env.TZ = "Asia/Taipei";

  const now = new Date();
  const end = new Date(now.setDate(now.getDate() + 1));

  const shadows = await prisma.shadow.findMany({
    where: { due: { lt: end } },
    orderBy: { due: "desc" },
    select: {
      id: true,
      title: true,
      subtitle: true,
    },
  });

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ shadows });
}
