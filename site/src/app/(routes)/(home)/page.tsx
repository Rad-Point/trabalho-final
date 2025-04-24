"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
export default function Home() {
  const click = async () => {
    const q = await fetch("/api/exames/get", {
      method: "POST",
      body: JSON.stringify({ numero: "R-1777854", senha: "R7606697" }),
    });
    const res = await q.json();
    console.log(res);
  };
  useEffect(() => {}, []);
  return (
    <main className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
      <Button
        onClick={(e) => {
          e.preventDefault();
          click();
        }}
      >
        Test
      </Button>
    </main>
  );
}
