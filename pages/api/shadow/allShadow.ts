import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: any = await getSession({ req });
  if (!session) {
    return;
  }

  if (session.user.email !== "oukalatte@gmail.com") {
    return;
  }
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=60"
  );

  try {
    process.env.TZ = "Asia/Taipei";

    const start = new Date("2022-07-24T00:00:00");

    const shadows = await prisma.shadow.findMany({
      where: { due: { gt: start } },
      orderBy: { due: "desc" },
    });

    return res.status(200).json({ shadows });
  } catch (e) {
    console.log(e);
  }
}
