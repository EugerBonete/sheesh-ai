import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-eerieBlack px-10 py-4 mt-[10rem]">
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <span className="text-lg text-white sm:text-center pb-1 mb-2 border-b-4 border-slate-500">
            © 2023 Sheesh AI. All Rights Reserved.
          </span>
          <p className="mt-1">Designed and developed by Euger Bonete</p>
        </div>
        <div className=" text-lg flex mt-4 space-x-6 sm:justify-center md:mt-0">
          <a href="#" className="text-gray-400hover:text-white">
            <AiFillGithub />
          </a>

          <a href="#" className="text-gray-400hover:text-white">
            <BsFacebook />
          </a>

          <a href="#" className="text-gray-400hover:text-white">
            <FaFacebookMessenger />
          </a>
        </div>
      </div>
    </footer>
  );
}
