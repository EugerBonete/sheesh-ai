"use client";

import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { Configuration, OpenAIApi } from "openai";
import { useState, FormEvent } from "react";
import { ColorRing } from "react-loader-spinner";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import ImageConverter from "./components/ImageConverter";

type Response = {
  role: string;
  content: string;
};

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
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
  };
  console.log(process.env.OPENAI_API_KEY);
  return (
    <main
      className={`bg-vanilla h-screen flex flex-col md:flex-row items-center m-5 gap-10`}
    >
      <div className="flex flex-col gap-10 w-full">
        <h1 className="text-black font-bold  text-4xl md:text-5xl lg:text-6xl mx-10 text-center">
          Effortlessly get answers from AI technology.
        </h1>
        <p className="text-center text-xl md:text-2xl">
          Sheesh AI, The AI Answer Generator for Quick Responses
        </p>
        {/* <ImageConverter /> */}
      </div>
      <form onSubmit={onSumbitHandler} className="flex flex-col gap-5 w-full">
        <Accordion
          allowZeroExpanded
          className="bg-semiBlack rounded-lg text-xl"
          onChange={() => setIsExpanded(!isExpanded)}
          style={{ color: "white" }}
        >
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton
                className="bg-eerieBlack px-4 py-2 rounded-lg text-2xl flex justify-start items-center gap-3"
                style={{ color: "white" }}
              >
                <div>
                  {" "}
                  {isExpanded ? (
                    <AiOutlineCaretDown />
                  ) : (
                    <AiOutlineCaretRight />
                  )}{" "}
                </div>
                How to use Sheesh AI?
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>Add your prompt to the textfield 👇 and hit generate.</p>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
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
