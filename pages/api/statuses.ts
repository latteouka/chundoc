import type { NextApiRequest, NextApiResponse } from "next";
const currentStatus = {
  world: {
    questName: "Lucky Draw",
    questTarget: 30000,
    questCurrent: 0,
    total: 0,
    date: {},
    guess: 0,
  },
  deck: {
    N5: {
      available: true,
      size: 627,
    },
    N4: {
      available: true,
      size: 541,
    },
    N3: {
      available: true,
      size: 1560,
    },
    N2: {
      available: true,
      size: 1425,
    },
    N1: {
      available: true,
      size: 2467,
    },
    N0: {
      available: true,
      size: 6,
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=60"
  );

  return res.status(200).json(currentStatus);
}
