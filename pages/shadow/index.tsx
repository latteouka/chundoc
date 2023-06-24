import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import cn from "classnames";
import Loading from "../../components/Loading";

const Shadow = () => {
  const { data: session }: any = useSession();
  const [count, setCount] = useState(0);
  const [shadows, setShadows] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const fetchShadows = async () => {
    const response = await axios.post("/api/shadow/allShadow");

    setShadows(response.data.shadows);

    const shadowsResult = response.data.shadows;

    let isDueCount = 0;
    for (let i = 0; i < shadowsResult.length; i++) {
      const isDue = new Date(shadowsResult[i].due) < new Date();
      if (!isDue) {
        isDueCount = isDueCount + 1;
      }
    }
    setCount(isDueCount);
    setIsReady(true);
  };

  useEffect(() => {
    fetchShadows();
  }, []);
  return (
    <>
      {session && isReady && session.user.email === "oukalatte@gmail.com" && (
        <div className="w-full p-5">
          <h1 className="font-bold text-2xl">All Shadowings</h1>
          <div className="flex items-center mt-4">
            <Link href={"/shadow/add"}>Add</Link>
            <p className="ml-4 border border-gray-300 p-2">
              alive: {count} days
            </p>
          </div>
          <div className="p-3 mt-4">
            <table className="table-auto border border-gray-200">
              <thead className="font-bold border-b border-gray-200">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Info</th>
                  <th className="p-2">台詞</th>
                  <th className="p-2">翻譯</th>
                  <th className="p-2">單字</th>
                  <th className="p-2">Furi</th>
                </tr>
              </thead>
              <tbody>
                {shadows.map((item, index) => {
                  const dueTime = new Date(item.due).toLocaleString("zh-TW", {
                    hour12: false,
                  });

                  const isDue = new Date(item.due) < new Date();
                  return (
                    <tr
                      key={index}
                      className={cn(
                        isDue ? "bg-gray-200" : "",
                        "border-b border-gray-300"
                      )}
                    >
                      <td className="p-2">
                        <div className="flex text-sm md:text-base">
                          <Link href={"/shadow/" + item.id}>
                            {item.id.toString()}
                          </Link>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-col text-sm md:text-base justify-center items-center">
                          <Link href={"/shadow/" + item.id}>{item.title}</Link>
                        </div>
                        <div className="text-sm md:text-base mt-2 text-center">
                          {item.subtitle}
                        </div>
                        <div className="text-sm md:text-base mt-2 text-center">
                          <Link
                            href={"/shadow-cover/" + item.coverUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.coverUrl}
                          </Link>
                        </div>
                        <div className="text-sm md:text-base mt-2 text-center">
                          <Link
                            href={"/shadow-sound/" + item.soundUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.soundUrl}
                          </Link>
                        </div>
                        <div className="text-sm md:text-base mt-2 text-center">
                          {dueTime}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-sm md:text-base">
                          {JSON.parse(item.answer).map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                        </div>
                      </td>
                      {item.tw && (
                        <td className="p-2">
                          <div className="text-sm md:text-base">
                            {JSON.parse(item.tw).map((item, index) => (
                              <p key={index}>{item}</p>
                            ))}
                          </div>
                        </td>
                      )}
                      <td className="p-2">
                        <div className="text-sm md:text-base">
                          {JSON.parse(item.word).map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-sm md:text-base">
                          {JSON.parse(item.wordAns).map((item, index) => (
                            <p key={index}>{item}</p>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!session && <Loading />}
    </>
  );
};

export default Shadow;
