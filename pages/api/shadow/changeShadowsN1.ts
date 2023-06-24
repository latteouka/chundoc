import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  process.env.TZ = "Asia/Taipei";

  // test
  const n1 = await prisma.shadow.findMany({
    where: {
      OR: [{ title: { contains: "N1" } }, { subtitle: { contains: "N1" } }],
    },
    orderBy: { due: "desc" },
  });

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ shadows: n1 });
}
