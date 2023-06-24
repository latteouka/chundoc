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

  const { id } = req.body;
  try {
    const shadow = await prisma.shadow.findUnique({
      where: { id },
    });
    return res.status(200).json({ shadow });
  } catch (e) {
    console.log(e);
  }
}
