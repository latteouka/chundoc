import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "no-store");

  try {
    const shadows = await prisma.shadow.findMany({
      where: { due: { gt: new Date() } },
      orderBy: { due: "asc" },
    });

    if (shadows.length > 0) {
      const shadow = {
        id: shadows[0].id,
        title: shadows[0].title,
        subtitle: shadows[0].subtitle,
        word: JSON.parse(shadows[0].word),
        wordAns: JSON.parse(shadows[0].wordAns),
        answer: JSON.parse(shadows[0].answer),
        answerTime: JSON.parse(shadows[0].answerTime),
        tw: JSON.parse(shadows[0].tw),
        coverUrl: "https://www.chundev.com/shadow-cover/" + shadows[0].coverUrl,
        soundUrl: "https://www.chundev.com/shadow-sound/" + shadows[0].soundUrl,
        aboutCoverUrl:
          "https://www.chundev.com/shadow-cover/" + shadows[0].coverUrl,
        aboutUrl: "https://discord.gg/xAbG8nUjjS",
        aboutTitle: "Discord",
      };
      const news = [];
      return res.status(200).json({ shadow, news });
    } else {
      const shadows = await prisma.shadow.findMany({
        orderBy: { due: "asc" },
        take: 1,
      });
      const shadow = {
        id: shadows[0].id,
        title: shadows[0].title,
        subtitle: shadows[0].subtitle,
        word: JSON.parse(shadows[0].word),
        wordAns: JSON.parse(shadows[0].wordAns),
        answer: JSON.parse(shadows[0].answer),
        answerTime: JSON.parse(shadows[0].answerTime),
        tw: JSON.parse(shadows[0].tw),
        coverUrl: "https://www.chundev.com/shadow-cover/" + shadows[0].coverUrl,
        soundUrl: "https://www.chundev.com/shadow-sound/" + shadows[0].soundUrl,
        aboutCoverUrl:
          "https://www.chundev.com/shadow-cover/" + shadows[0].coverUrl,
        aboutUrl: "https://discord.gg/xAbG8nUjjS",
        aboutTitle: "Discord",
        trialChinese: "",
        trialEnglish: "",
      };
      const news = [];
      return res.status(200).json({ shadow, news });
    }
  } catch (e) {
    console.log(e);
  }
}
