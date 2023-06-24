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
  if (req.method === "POST") {
    const {
      id,
      title,
      subtitle,
      answer,
      answerTime,
      word,
      wordAns,
      tw,
      coverUrl,
      soundUrl,
      due,
    } = req.body;

    await prisma.shadow.update({
      where: {
        id,
      },
      data: {
        title,
        subtitle,
        answer: JSON.stringify(answer),
        answerTime: JSON.stringify(answerTime),
        word: JSON.stringify(word),
        wordAns: JSON.stringify(wordAns),
        tw: JSON.stringify(tw),
        coverUrl,
        soundUrl,
        due,
      },
    });

    const shadows = await prisma.shadow.findMany({
      orderBy: { due: "desc" },
    });

    return res.status(200).json({ shadows });
  } else {
    // Handle any other HTTP method
    return res.status(200).json({ status: "Please send with POST method." });
  }
}
