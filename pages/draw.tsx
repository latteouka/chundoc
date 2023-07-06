import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./draw.module.scss";

const title = "luckydraw1";

const Draw = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = router.query;

  async function handleSubmit() {
    setLoading(true);
    await axios.post("https://jpbox.chundev.com/draws/update", {
      userId: params.userId,
      platform: params.platform,
      title,
      email,
      createdAt: new Date(),
    });
    setLoading(false);
    setDone(true);
  }

  useEffect(() => {
    if (!params.userId) return;
    const getNow = async () => {
      const result = await axios.post("http://localhost:4000/draws/now", {
        userId: params.userId,
      });
      if (!result.data) return;
      setEmail(result.data.email);
    };

    getNow();
  }, [params.userId]);

  if (!params.userId || !params.platform) return null;

  if (done)
    return (
      <div className={styles.container}>
        <div>Done!</div>
      </div>
    );
  return (
    <div className={styles.container}>
      <div>Email</div>
      <div>{params.userId}</div>
      <input
        type="email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className={styles.submit}
        onClick={handleSubmit}
        disabled={loading}
      >
        Update
      </button>
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
