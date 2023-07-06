import { useRouter } from "next/router";

const Draw = (props) => {
  const router = useRouter();
  console.log(router.query);
  const params = router.query;

  if (!params.userId || !params.platform) return null;
  return (
    <div>
      <div>etet</div>
      <div>etet</div>
      <div>etet</div>
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
