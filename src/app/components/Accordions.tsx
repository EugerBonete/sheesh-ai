import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { useState } from "react";

export default function Accordions() {
  const [selected, setSelected] = useState<null | number>(null);

  const accordionData = [
    {
      Q: "What is SheeshAI?",
      A: "SheeshAI is an advanced chatbot powered by the GPT-3 architecture that uses natural language processing to generate accurate and helpful responses.",
    },
    {
      Q: " How does SheeshAI work?",
      A: "SheeshAI uses machine learning algorithms to analyze user input and generate responses based on the data it has been trained on. It can also learn from user interactions to improve its responses over time.",
    },
    {
      Q: "How do I use SheeshAI?",
      A: "To use SheeshAI, simply click on the input field and add your query or prompt. Once you have entered your query, click on the generate button and SheeshAI will generate a response based on the data it has been trained on. You can continue to refine your query and generate responses until you find the information you are looking for.",
    },
  ];

  const handleAccordionClick = (i: number) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <Accordion
      allowZeroExpanded
      className="rounded-lg text-xl flex flex-col gap-5"
      style={{ color: "white" }}
    >
      {accordionData.map((data, index) => {
        return (
          <AccordionItem
            key={data.Q}
            onClick={() => handleAccordionClick(index)}
          >
            <AccordionItemHeading>
              <AccordionItemButton
                className={`bg-eerieBlack px-4 py-2 ${
                  selected === index ? "rounded-t-lg" : "rounded-lg"
                } text-xl md:text-2xl flex justify-start items-center gap-3`}
                style={{ color: "white" }}
              >
                <div>
                  {selected === index ? (
                    <AiOutlineCaretDown />
                  ) : (
                    <AiOutlineCaretRight />
                  )}
                </div>
                {data.Q}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="bg-semiBlack overflow-hidden rounded-b-lg p-4">
              <p className="text-md md:text-xl">{data.A}</p>
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
