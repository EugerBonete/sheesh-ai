"use client";

import Header from "./components/Header";
import FormField from "./components/FormField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = () => {
  toast.success("📋 Copied to clipboard!", {
    position: toast.POSITION.TOP_CENTER,
  });
};

export default function Home() {
  return (
    <main className="flex flex-col p-5 gap-10">
      <ToastContainer />
      <Header />
      <FormField />
    </main>
  );
}
