import { useRouter } from "next/router";
import styles from "./draw.module.scss";

const Draw = () => {
  const router = useRouter();
  console.log(router.query);
  const params = router.query;

  if (!params.userId || !params.platform) return null;
  return (
    <div className={styles.container}>
      <div>Email</div>
      <input className={styles.input} />
      <div>{params.userId}</div>
      <div>{params.platform}</div>
    </div>
  );
};
export default Draw;

// export async function getServerSideProps(context) {
//   const userId = context.query["userId"];
//   const platform = context.query["platform"];
//   if (!userId) return { props: {} };
//
//   return {
//     props: {
//       userId,
//       platform,
//     },
//   };
// }
