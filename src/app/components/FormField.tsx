import { Configuration, OpenAIApi } from "openai";
import { useState, FormEvent } from "react";
import { ColorRing } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getRandomPercentage } from "../utils/randomPercentage";
import Typewriter from "typewriter-effect";

type Response = {
  role: string;
  content: string;
};

export default function FormField() {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Response>();

  const onSumbitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const configuration = new Configuration({
      organization: "org-xREJpct1suUf3UfeWG2NwBY4",
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    setIsLoading(false);
    setData(completion.data.choices[0].message);
    setInput("");
  };

  return (
    <form
      onSubmit={onSumbitHandler}
      className={`flex flex-col gap-4 w-full ${
        isLoading || (data?.content ? "" : "justify-center")
      }`}
    >
      <h1 className="text-3xl font-semibold">Enter a prompt to start 👇</h1>
      <textarea
        id="message"
        rows={6}
        className="resize-none block p-2.5 w-full text-2xl bg-semiBlack text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your prompt here..."
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />

      <button
        className={`bg-slate-200 text-eerieBlack px-4 ${
          isLoading ? "pb-3 pt-2" : "py-2"
        } rounded-lg self-end text-2xl flex disabled:opacity-50 disabled:cursor-not-allowed`}
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
      {isLoading && (
        <>
          <h1 className="text-3xl font-semibold flex">
            Generationg response{" "}
            <span>
              <Typewriter
                options={{
                  strings: "...",
                  autoStart: true,
                  loop: true,
                  cursor: "",
                }}
              />
            </span>
          </h1>
          <div className="p-2.5 w-full text-2xl bg-semiBlack text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            {Array(5)
              .fill(undefined)
              .map((skeleton, index) => (
                <Skeleton
                  key={index}
                  baseColor="#5B6363"
                  highlightColor="#fff"
                  width={getRandomPercentage()}
                />
              ))}
          </div>
        </>
      )}

      {!isLoading && data?.content && (
        <>
          <h1 className="text-3xl font-semibold">Results:</h1>
          <textarea
            id="message"
            rows={6}
            className="resize-none block p-2.5 w-full text-2xl bg-semiBlack text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Warming up the hamsters, to fetch your data..."
            onChange={(e) => setInput(e.target.value)}
            value={
              data?.content.replace(/\n\n/g, "") ||
              "Warming up the hamsters, to fetch your data..."
            }
            readOnly
          />
        </>
      )}
    </form>
  );
}
