import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "no-store");

  try {
    process.env.TZ = "Asia/Taipei";
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
        trialChinese: "",
        trialEnglish: "Content is updated at 00:00(GMT+8).",
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
    // let shadowOri: any;
    // const day = new Date().getDay();

    // switch (day) {
    //   case 0:
    //     shadowOri = await prisma.shadow.findUnique({
    //       where: { id: 104 },
    //     });
    //     break;
    //   case 1:
    //     shadowOri = await prisma.shadow.findUnique({
    //       where: { id: 91 },
    //     });
    //     break;
    //   case 2:
    //     shadowOri = await prisma.shadow.findUnique({
    //       where: { id: 92 },
    //     });
    //     break;
    //   case 3:
    //     shadowOri = await prisma.shadow.findUnique({
    //       where: { id: 105 },
    //     });
    //     break;
    //   case 4:
    //     shadowOri = await prisma.shadow.findUnique({
    //       where: { id: 91 },
    //     });
    //     break;
    //   case 5:
    //     shadowOri = await prisma.shadow.findUnique({
    //       where: { id: 92 },
    //     });
    //     break;
    //   case 6:
    //     shadowOri = await prisma.shadow.findUnique({
    //       where: { id: 105 },
    //     });
    //     break;
    //   default:
    //     shadowOri = await prisma.shadow.findUnique({
    //       where: { id: 105 },
    //     });
    //     break;
    // }

    // const news = [];
    // const shadow = {
    //   id: shadowOri.id,
    //   title: shadowOri.title,
    //   word: JSON.parse(shadowOri.word),
    //   wordAns: JSON.parse(shadowOri.wordAns),
    //   answer: JSON.parse(shadowOri.answer),
    //   answerTime: JSON.parse(shadowOri.answerTime),
    //   tw: JSON.parse(shadowOri.tw),
    //   coverUrl: "https://www.chundev.com/shadow-cover/" + shadowOri.coverUrl,
    //   soundUrl: "https://www.chundev.com/shadow-sound/" + shadowOri.soundUrl,
    //   aboutUrl: "https://discord.gg/xAbG8nUjjS",
    //   aboutTitle: "Discord",
    //   aboutCoverUrl:
    //     "https://www.chundev.com/shadow-cover/" + shadowOri.coverUrl,
    //   trialChinese: "訂閱三天試用期可查看所有課題。",
    //   trialEnglish: "You can see all topics within 3-day trial.",
    // };
    // return res.status(200).json({ shadow, news });

    // const shadows = await prisma.shadow.findMany({
    //   where: { due: { gt: new Date() } },
    //   orderBy: { due: "asc" },
    // });
    // if (shadows.length > 0) {
    //   const shadow = {
    //     title: shadows[0].title,
    //     words: JSON.parse(shadows[0].word),
    //     wordAns: JSON.parse(shadows[0].wordAns),
    //     answer: JSON.parse(shadows[0].answer),
    //     answerTime: JSON.parse(shadows[0].answerTime),
    //     coverUrl: "https://www.chundev.com/shadow-cover/" + shadows[0].coverUrl,
    //     soundUrl: "https://www.chundev.com/shadow-sound/" + shadows[0].soundUrl,
    //   };
    //   const news = ["Contents are updated daily without subsciption now."];
    //   return res.status(200).json({ shadow, news });
    // } else {
    //   const news = [];
    //   return res.status(200).json({ shadow: [], news });
    // }
  } catch (e) {
    console.log(e);
  }
}
