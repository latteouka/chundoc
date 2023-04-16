export interface BlogType {
  title: string;
  desc: string;
  date: string;
  path: string;
}

const blog: BlogType[] = [
  {
    title: "Page Transition in Next.js with GSAP",
    desc: "不用其他函式庫，並結合three.js元素進行頁面轉場。",
    date: "Mar 19 2022",
    path: "/blogs/transition-next",
  },
  {
    title: "Test2",
    desc: "this is post 2",
    date: "Mar 18 2022",
    path: "test2",
  },
  {
    title: "Test1",
    desc: "this is post 1",
    date: "Mar 17 2022",
    path: "test1",
  },
];

export default blog;
