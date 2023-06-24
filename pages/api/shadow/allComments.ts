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

  const now = new Date();
  const timeZone = "Asia/Taipei";

  // 00:00
  const start = new Date(
    new Date(new Date().toLocaleDateString("zh-TW", { timeZone })).getTime()
  );
  console.log(start.toLocaleString("zh-TW", { hour12: false }));

  const end = new Date(
    new Date(new Date().toLocaleDateString("zh-TW", { timeZone })).getTime() +
      24 * 60 * 60 * 1000 -
      1
  );
  console.log(end.toLocaleString("zh-TW", { hour12: false }));

  console.log(now > start);

  try {
    const discuss = await prisma.discuss.findMany();
    return res.status(200).json({ discuss });
  } catch (e) {
    console.log(e);
  }
}
