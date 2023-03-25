"use client";

import React from "react";
import Typewriter from "typewriter-effect";
import Accordions from "./Accordions";

export default function Header() {
  return (
    <div className="flex flex-col w-full   gap-20">
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
      <Accordions />
    </div>
  );
}
