"use client";

import Header from "./components/Header";
import FormField from "./components/FormField";

export default function Home() {
  return (
    <main className="flex flex-col p-5 gap-10">
      <Header />
      <FormField />
    </main>
  );
}
