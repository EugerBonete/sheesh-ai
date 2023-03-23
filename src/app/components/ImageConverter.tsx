import React from "react";
import Tesseract from "tesseract.js";
import { useState } from "react";

export default function ImageConverter() {
  const [imageData, setImageData] = useState<any>();

  const ImageHandler = async () => {
    Tesseract.recognize(
      "https://tesseract.projectnaptha.com/img/eng_bw.png",
      "eng",
      { logger: (m) => console.log(m) }
    ).then(({ data: { text } }) => {
      setImageData(text);
    });
  };
  return (
    <div>
      <button onClick={ImageHandler}>img</button>
      {imageData && JSON.stringify(imageData)}
    </div>
  );
}
