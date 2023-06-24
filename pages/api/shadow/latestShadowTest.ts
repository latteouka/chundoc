import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "no-store");

  try {
    const shadowOri = await prisma.shadow.findUnique({
      where: { id: 1 },
    });
    const news = [];
    const shadow = {
      title: shadowOri.title,
      words: JSON.parse(shadowOri.word),
      wordAns: JSON.parse(shadowOri.wordAns),
      answer: JSON.parse(shadowOri.answer),
      answerTime: JSON.parse(shadowOri.answerTime),
      tw: JSON.parse(shadowOri.tw),
      coverUrl: "https://www.chundev.com/shadow-cover/" + shadowOri.coverUrl,
      soundUrl: "https://www.chundev.com/shadow-sound/" + shadowOri.soundUrl,
      aboutUrl: "https://discord.gg/g478ChhAFt",
      aboutTitle: "Discord",
      aboutCoverUrl: "https://www.chundev.com/chundevcover.jpg",
    };
    return res.status(200).json({ shadow, news });
  } catch (e) {
    console.log(e);
  }
}
