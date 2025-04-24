"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  useEffect(() => {}, []);
  return (
    <main className="w-full min-h-screen">
      <header className="w-full h-16 p-2 flex justify-between items-center border-b border-accent">
        <Image
          className="rounded-full object-cover"
          src="/logo.jpg"
          alt="logo"
          width={40}
          height={40}
        />
        <nav>
          <ul>
            <li>
              <Button variant={"link"} asChild>
                <Link href="/exames/resultado">Resultados</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
    </main>
  );
}
