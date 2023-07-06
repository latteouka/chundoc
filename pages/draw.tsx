import { useRouter } from "next/router";

const Draw = () => {
  const router = useRouter();
  console.log(router.query.keyword);
  return (
    <div>
      <div>etet</div>
      <div>etet</div>
      <div>etet</div>
    </div>
  );
};
export default Draw;
