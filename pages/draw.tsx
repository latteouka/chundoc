import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./draw.module.scss";

const title = "luckydraw1";

const Draw = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = router.query;

  async function handleSubmit() {
    setLoading(true);
    await axios.post("https://jpbox.chundev.com/draws/add", {
      userId: params.userId,
      platform: params.platform,
      title,
      email,
      createdAt: new Date(),
    });
    setLoading(false);
    setDone(true);
  }

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
      <input
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className={styles.submit}
        onClick={handleSubmit}
        disabled={loading}
      >
        Submit
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
