"use client";

import useCollapse from "react-collapsed";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { Configuration, OpenAIApi } from "openai";
import { useState, FormEvent } from "react";
import { ColorRing } from "react-loader-spinner";

type Response = {
  role: string;
  content: string;
};

export default function Home() {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Response>();

  const formHandler = async () => {};
  const onSumbitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    setIsLoading(false);
    setData(completion.data.choices[0].message);
  };
  console.log(data);

  return (
    <main className={`bg-vanilla h-screen flex items-center m-5`}>
      <div className="flex flex-col gap-10  w-full">
        <h1 className="text-black font-bold text-7xl mx-10 text-center">
          Sheesh AI
        </h1>
        <p className="text-center text-2xl">
          Effortlessly rephrase your sentences with the power of AI technology.
        </p>
      </div>
      <form onSubmit={onSumbitHandler} className="flex flex-col gap-5 w-full">
        <div
          style={{ color: "white" }}
          className="shadow-lg px-4 py-2 text-2xl bg-eerieBlack rounded-lg"
        >
          <button {...getToggleProps()} className="w-full">
            <div className="flex justify-between">
              <div>How to use?</div>
              <div className="py-2">
                {isExpanded ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
              </div>
            </div>
          </button>
          <section {...getCollapseProps()}>
            <p className="ml-5 my-4 text-[1.3rem]">
              Simply type in your text into the input field below and click on
              the "generate" button. Then, wait for the results to appear.
              Enjoy!
            </p>
          </section>
        </div>
        <textarea
          id="message"
          rows={4}
          className=" resize-none block p-2.5 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your text here..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          className={`bg-eerieBlack px-4 ${
            isLoading ? "pb-3 pt-2" : "py-2"
          } rounded-lg self-end text-2xl flex disabled:opacity-50`}
          style={{ color: "white" }}
          disabled={input.length < 5 || isLoading}
        >
          <p>{isLoading ? "Generating..." : "Generate"}</p>
          {isLoading && (
            <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </button>

        {data?.content && (
          <>
            <h1 className="text-2xl font-bold">Results:</h1>
            <textarea
              id="message"
              rows={4}
              className=" resize-none block p-2.5 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your text here..."
              onChange={(e) => setInput(e.target.value)}
              value={data?.content.replace(/\n\n/g, "")}
              readOnly
            />
          </>
        )}
      </form>
    </main>
  );
}
