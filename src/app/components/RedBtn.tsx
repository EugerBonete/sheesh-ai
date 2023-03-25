import React from "react";
import { ColorRing } from "react-loader-spinner";

export default function RedBtn({
  isLoading,
  title,
  onClick,
}: {
  isLoading?: boolean;
  title?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="mx-auto disabled:cursor-not-allowed text-xl relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-red-600 rounded-lg group"
    >
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-red-900"></span>
      <span className="relative">{title}</span>
      {isLoading && (
        <span className="relative">
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e6e6e6", "#d9d9d9", "#f2f2f2", "#cccccc", "#bfbfbf"]}
          />
        </span>
      )}
    </div>
  );
}
