import Link from "next/link";
import blogs, { BlogType } from "../data/blogs";
import style from "./blog.module.scss";

const Blog = () => {
  return (
    <div className={style.container}>
      {blogs.map((blog, index) => {
        return <Box blog={blog} key={index} />;
      })}
    </div>
  );
};
export default Blog;

const Box = ({ blog }: { blog: BlogType }) => {
  return (
    <Link href={blog.path}>
      <div className={style.box}>
        <div className={style.title}>{blog.title}</div>
        <div className={style.desc}>{blog.desc}</div>
        <div className={style.tags}>
          {blog.tags.map((tag) => {
            return <div className={style.tag}>{tag}</div>;
          })}
        </div>
        <div className={style.date}>{blog.date}</div>
      </div>
    </Link>
  );
};
