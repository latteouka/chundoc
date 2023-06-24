import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

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
    const shadow = await prisma.shadow.delete({
      where: { id: 113 },
    });
    return res.status(200).json({ delete: shadow });
  } catch (e) {
    console.log(e);
    return res.status(404);
  }
}
