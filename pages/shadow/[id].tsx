import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { MdOutlineDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [soundUrl, setSoundUrl] = useState("");
  const [answer, setAnswer] = useState([]);
  const [answerTime, setAnswerTime] = useState([]);
  const [tw, setTw] = useState([]);
  const [word, setWord] = useState([]);
  const [wordAns, setWordAns] = useState([]);
  const [due, setDue] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const id: any = router.query.id;
  const idInt = parseInt(id);

  const changeAnswerHandler = async (index, event) => {
    const result = [...answer];
    result[index] = event.target.value;
    setAnswer(result);
  };

  const deleteAnswerHandler = async (index) => {
    const result = [...answer];
    result.splice(index, 1);
    setAnswer(result);
  };

  const changeAnswerTimeHandler = async (index, event) => {
    const result = [...answerTime];
    result[index] = parseFloat(event.target.value);
    setAnswerTime(result);
  };

  const deleteAnswerTimeHandler = async (index) => {
    const result = [...answerTime];
    result.splice(index, 1);
    setAnswerTime(result);
  };

  const changeTwHandler = async (index, event) => {
    const result = [...tw];
    result[index] = event.target.value;
    setTw(result);
  };

  const deleteTwHandler = async (index) => {
    const result = [...tw];
    result.splice(index, 1);
    setTw(result);
  };

  const changeWordHandler = async (index, event) => {
    const result = [...word];
    result[index] = event.target.value;
    setWord(result);
  };

  const deleteWordHandler = async (index) => {
    const result = [...word];
    result.splice(index, 1);
    setWord(result);
  };

  const changeWordAnsHandler = async (index, event) => {
    const result = [...wordAns];
    result[index] = event.target.value;
    setWordAns(result);
  };

  const deleteWordAnsHandler = async (index) => {
    const result = [...wordAns];
    result.splice(index, 1);
    setWordAns(result);
  };

  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    await axios.post("/api/shadow/editShadow", {
      id: idInt,
      title,
      subtitle,
      answer,
      answerTime,
      word,
      wordAns,
      tw,
      coverUrl,
      soundUrl,
      due,
    });

    setIsLoading(false);
    router.push("/shadow/" + id);
  };

  const addAnswer = () => {
    const result = [...answer];
    result.push("");

    setAnswer(result);
  };

  const addTw = () => {
    const result = [...tw];
    result.push("");

    setTw(result);
  };

  const addAnswerTime = () => {
    const result = [...answerTime];
    result.push(0);

    setAnswerTime(result);
  };

  const addWord = () => {
    const result = [...word];
    result.push("");

    setWord(result);
  };

  const addWordAns = () => {
    const result = [...wordAns];
    result.push("");

    setWordAns(result);
  };

  const fetchShadow = async () => {
    const response = await axios.post("/api/shadow/fetchShadow", {
      id: idInt,
    });
    const result = response.data.shadow;
    const answerParse = JSON.parse(result.answer);
    const answerTimeParse = JSON.parse(
      result.answerTime ? result.answerTime : "[]"
    );
    const wordParse = JSON.parse(result.word);
    const wordAnsParse = JSON.parse(result.wordAns ? result.wordAns : "[]");
    const twParse = JSON.parse(result.tw ? result.tw : "[]");

    setTitle(result.title);
    setSubtitle(result.subtitle);
    setCoverUrl(result.coverUrl);
    setSoundUrl(result.soundUrl);
    setDue(new Date(result.due));
    setAnswer(answerParse);
    setAnswerTime(answerTimeParse);
    setWord(wordParse);
    setWordAns(wordAnsParse);
    setTw(twParse);
  };

  useEffect(() => {
    fetchShadow();
  }, []);

  return (
    <div className="flex flex-col w-full p-5">
      <p className="font-bold text-2xl">Edit Shadowing Item</p>
      <Link href="/shadow">Back</Link>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-2">
          <label className="mt-4">Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <label>Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(event) => setSubtitle(event.target.value)}
          />
          <label>CoverUrl</label>
          <input
            type="text"
            value={coverUrl}
            onChange={(event) => setCoverUrl(event.target.value)}
            required
          />
          <label>SoundUrl</label>
          <input
            type="text"
            value={soundUrl}
            onChange={(event) => setSoundUrl(event.target.value)}
            required
          />
          <div className="flex">
            <div className="flex flex-col border border-gray-300 rounded-xl p-2 w-[30%]">
              <div className="flex">
                <label>Answer</label>
                <div className="flex ml-4">
                  <p
                    onClick={addAnswer}
                    className="border border-gray-300 bg-white hover:bg-gray-200 w-[100px] flex justify-center items-center"
                  >
                    Add
                  </p>
                </div>
              </div>
              <div>
                {answer.map((item, index) => {
                  return (
                    <div className="flex flex-col select-none" key={index}>
                      <div className="flex justify-between items-center">
                        <span
                          className="flex justify-center items-center cursor-pointer text-xl"
                          onClick={() => {
                            deleteAnswerHandler(index);
                          }}
                        >
                          <MdOutlineDelete />
                        </span>
                      </div>
                      <input
                        className="h-5"
                        type="text"
                        value={item}
                        onChange={(event) => changeAnswerHandler(index, event)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col border border-gray-300 rounded-xl p-2 w-[25%]">
              <div className="flex">
                <label>TW</label>
                <div className="flex ml-4">
                  <p
                    onClick={addTw}
                    className="border border-gray-300 bg-white hover:bg-gray-200 w-[100px] flex justify-center items-center"
                  >
                    Add
                  </p>
                </div>
              </div>
              <div>
                {tw.map((item, index) => {
                  return (
                    <div className="flex flex-col select-none" key={index}>
                      <div className="flex justify-between items-center">
                        <span
                          className="flex justify-center items-center cursor-pointer text-xl"
                          onClick={() => {
                            deleteTwHandler(index);
                          }}
                        >
                          <MdOutlineDelete />
                        </span>
                      </div>
                      <input
                        className="h-5"
                        type="text"
                        value={item}
                        onChange={(event) => changeTwHandler(index, event)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col border border-gray-300 rounded-xl p-2 w-[15%]">
              <div className="flex">
                <label>AnswerTime</label>
                <div className="flex ml-4">
                  <p
                    onClick={addAnswerTime}
                    className="border border-gray-300 bg-white hover:bg-gray-200 w-[100px] flex justify-center items-center"
                  >
                    Add
                  </p>
                </div>
              </div>
              <div>
                {answerTime.map((item, index) => {
                  return (
                    <div className="flex flex-col select-none" key={index}>
                      <div className="flex justify-between items-center">
                        <span
                          className="flex justify-center items-center cursor-pointer text-xl"
                          onClick={() => {
                            deleteAnswerTimeHandler(index);
                          }}
                        >
                          <MdOutlineDelete />
                        </span>
                      </div>
                      <input
                        className="h-5"
                        type="number"
                        step="0.01"
                        value={item}
                        onChange={(event) =>
                          changeAnswerTimeHandler(index, event)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col border border-gray-300 rounded-xl p-2 w-[15%]">
              <div className="flex">
                <label>Word</label>
                <div className="flex ml-4">
                  <p
                    onClick={addWord}
                    className="border border-gray-300 bg-white hover:bg-gray-200 w-[100px] flex justify-center items-center"
                  >
                    Add
                  </p>
                </div>
              </div>
              <div>
                {word.map((item, index) => {
                  return (
                    <div className="flex flex-col select-none" key={index}>
                      <div className="flex justify-between items-center">
                        <span
                          className="flex justify-center items-center cursor-pointer text-xl"
                          onClick={() => {
                            deleteWordHandler(index);
                          }}
                        >
                          <MdOutlineDelete />
                        </span>
                      </div>
                      <input
                        className="h-5"
                        type="text"
                        value={item}
                        onChange={(event) => changeWordHandler(index, event)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col border border-gray-300 rounded-xl p-2 w-[15%]">
              <div className="flex">
                <label>WordAns</label>
                <div className="flex ml-4">
                  <p
                    onClick={addWordAns}
                    className="border border-gray-300 bg-white hover:bg-gray-200 w-[100px] flex justify-center items-center"
                  >
                    Add
                  </p>
                </div>
              </div>
              <div>
                {wordAns.map((item, index) => {
                  return (
                    <div className="flex flex-col select-none" key={index}>
                      <div className="flex justify-between items-center">
                        <span
                          className="flex justify-center items-center cursor-pointer text-xl"
                          onClick={() => {
                            deleteWordAnsHandler(index);
                          }}
                        >
                          <MdOutlineDelete />
                        </span>
                      </div>
                      <input
                        className="h-5"
                        type="text"
                        value={item}
                        onChange={(event) => changeWordAnsHandler(index, event)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold mt-4">Due</p>
          <DatePicker
            className="mt-4"
            selected={due}
            onChange={(date: Date) => setDue(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-4 py-2 mt-4 border border-gray-300 bg-white rounded-xl"
            disabled={isLoading}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
