import { Configuration, OpenAIApi } from "openai";
import { useState, FormEvent } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getRandomPercentage } from "../utils/randomPercentage";
import Typewriter from "typewriter-effect";
import CustomButton from "./Button";
import GreenBtn from "./GreenBtn";
import RedBtn from "./RedBtn";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { notify } from "../layout";

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
      id="myTextarea"
      onSubmit={onSumbitHandler}
      className={`bg-eerieBlack px-10 font-mono rounded-lg flex w-full flex-col lg:flex-row gap-10 justify-center py-[4rem] md:py-[8rem] ${
        isLoading || (data?.content ? "" : "justify-center")
      }`}
    >
      <div className="flex-1 flex gap-8 flex-col items-center">
        <h1 className=" font-semibold text-center text-2xl md:text-3xl  self-start">
          <Typewriter
            options={{
              strings: "Enter a prompt 👇 to start",
              autoStart: true,
              delay: 50,
            }}
          />
        </h1>
        <textarea
          rows={8}
          className="resize-none  block p-3 w-full text-xl md:text-2xl bg-semiBlack text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your prompt here..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <CustomButton isLoading={isLoading} title="Generate" />
      </div>

      <div className="flex-1 flex gap-8 flex-col">
        {/* LOADING STATE */}
        {isLoading && (
          <>
            <h1 className="font-semibold flex text-2xl md:text-3xl self-start">
              Generating response{" "}
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
            <div className="p-3 w-full text-2xl bg-semiBlack text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              {Array(8)
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
        {/* NO PROMPT STATE */}
        {!isLoading && !data?.content && (
          <>
            <h1 className="font-semibold text-center text-2xl md:text-3xl  self-start">
              Results:
            </h1>
            <textarea
              id="message"
              rows={8}
              className="resize-none block p-2.5 w-full text-2xl bg-semiBlack text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Results will show up here..."
              onChange={(e) => setInput(e.target.value)}
              value={data?.content.replace(/\n\n/g, "")}
              readOnly
            />
          </>
        )}
        {/* DATA LOADED STATE */}
        {!isLoading && data?.content && (
          <div className="flex-1 flex gap-8 flex-col items-center">
            <h1 className="text-center text-2xl md:text-3xl  self-start">
              Results:
            </h1>
            <textarea
              id="message"
              rows={8}
              className="resize-none block p-2.5 w-full text-2xl bg-semiBlack text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Warming up the hamsters, to fetch your data..."
              onChange={(e) => setInput(e.target.value)}
              value={data?.content.replace(/\n\n/g, "")}
              readOnly
            />
            <div className="flex gap-10">
              <CopyToClipboard text={data?.content.replace(/\n\n/g, "") || ""}>
                <GreenBtn title="Copy" onClick={notify} />
              </CopyToClipboard>
              <RedBtn
                title="Delete"
                onClick={() => setData({ role: "", content: "" })}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
