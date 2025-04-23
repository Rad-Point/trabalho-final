"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  const [laudos, setLaudos] = useState<string[]>([]);
  const test = async () => {
    const q = await fetch("/api/laudos/get", { method: "GET" });
    const res = await q.json();
    setLaudos(res.length > 0 ? res : []);
  };
  useEffect(() => {
    test();
  }, []);
  return (
    <main className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
      {laudos.map((laudo, i) => {
        return (
          <Button key={i} asChild>
            <Link href={`/dashboard/exames/anexar-imagens/${laudo}`}>
              {laudo}
            </Link>
          </Button>
        );
      })}
    </main>
  );
}
