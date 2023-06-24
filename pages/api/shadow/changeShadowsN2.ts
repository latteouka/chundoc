import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  process.env.TZ = "Asia/Taipei";

  const n2 = await prisma.shadow.findMany({
    where: {
      OR: [{ title: { contains: "N2" } }, { subtitle: { contains: "N2" } }],
    },
    orderBy: { due: "desc" },
  });

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ shadows: n2 });
}
