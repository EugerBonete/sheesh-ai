"use client";

import React from "react";
import Typewriter from "typewriter-effect";
import Accordions from "./Accordions";
import CustomButton from "./Button";

export default function Header() {
  const handleLinkClick = () => {
    const textArea = document.getElementById("myTextarea");
    if (textArea) {
      textArea.focus();
      const topOffset =
        textArea.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: topOffset + -100, behavior: "smooth" });
    }
  };

  return (
    <div className="flex w-full flex-col lg:flex-row gap-10 justify-center py-[4rem] md:py-[8rem]">
      <div className="flex-1 flex flex-col gap-20">
        <h1 className="font-bold text-4xl md:text-5xl text-center">
          Effortlessly get answers from AI technology.
        </h1>

        <div className="text-center text-xl md:text-2xl font-mono h-20">
          <Typewriter
            options={{
              strings: [
                "SheeshAI, The AI Answer Generator for Quick Responses",
                "Introducing SheeshAI, the fastest way to get the answers you need!",
                "Need answers in a flash? Look no further than SheeshAI, the lightning-fast AI answer generator!",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-20">
        <Accordions />

        <CustomButton onClick={handleLinkClick} title="Try Now!" />
      </div>
      {/* 
      
      </div>
      <div className="flex-1">
       
      </div> */}
    </div>
  );
}
