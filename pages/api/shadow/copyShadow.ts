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

  const shadowOri = await prisma.shadow.findUnique({
    where: { id: 114 },
  });

  const shadowNew = await prisma.shadow.create({
    data: {
      title: shadowOri.title,
      subtitle: shadowOri.subtitle,
      answer: shadowOri.answer,
      answerTime: shadowOri.answerTime,
      word: shadowOri.word,
      wordAns: shadowOri.wordAns,
      tw: shadowOri.tw,
      coverUrl: shadowOri.coverUrl,
      soundUrl: shadowOri.soundUrl,
      due: shadowOri.due,
    },
  });

  return res.status(200).json({ shadow: shadowNew });
}
