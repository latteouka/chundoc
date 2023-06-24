import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "no-store");

  try {
    const announce = [
      "Daily content is updated at 00:00(GMT+8).",
      "每日內容更新時間為0時(GMT+8)。",
      "Join Discord server to ask or chat.",
      "加入Discord問問題或與大家閒聊。不定時有補充內容。",
    ];
    return res.status(200).json({ announce });
  } catch (e) {
    console.log(e);
  }
}
