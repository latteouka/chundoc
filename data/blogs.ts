export interface BlogType {
  title: string;
  desc: string;
  date: string;
  path: string;
  tags: string[];
}

const blog: BlogType[] = [
  {
    title: "Page Transition in Next.js with GSAP",
    desc: "不用其他函式庫，並結合three.js元素進行頁面轉場。",
    date: "Mar 19 2022",
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
