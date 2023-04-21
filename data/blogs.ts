export interface BlogType {
  title: string;
  desc: string;
  date: string;
  path: string;
  tags: string[];
}

const blog: BlogType[] = [
  {
    title: "Publish NPM Package with tsup",
    desc: "把自己常用的東西模組化吧。",
    date: "Apr 18 2023",
    tags: ["npm", "tsup"],
    path: "/blogs/npm-publish-tsup",
  },
  {
    title: "Page Transition in Next.js with GSAP",
    desc: "不用其他函式庫，並結合three.js元素進行頁面轉場。",
    date: "Apr 3 2023",
    tags: ["next", "gsap", "webgl"],
    path: "/blogs/transition-next",
  },
  {
    title: "Spotify API",
    desc: "搭配Next.js API Route就能顯示自己正在聽的歌曲囉。",
    date: "Mar 28 2022",
    tags: ["next"],
    path: "/blogs/spotify-api",
  },
  {
    title: "Sticky Tiles",
    desc: "全螢幕視差塊。",
    date: "Mar 07 2022",
    tags: ["css"],
    path: "/blogs/sticky-tiles",
  },
];

export default blog;
