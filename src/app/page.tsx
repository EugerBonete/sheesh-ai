"use client";

import Header from "./components/Header";
import FormField from "./components/FormField";
import ToastContainerComponent from "./components/ToastContainer";

export default function Home() {
  return (
    <main className="flex flex-col p-5 gap-10">
      <ToastContainerComponent />
      <Header />
      <FormField />
    </main>
  );
}
