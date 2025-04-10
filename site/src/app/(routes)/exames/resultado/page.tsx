"use client";
import ExameBit from "@/components/exame-bit";
import Buscar from "@/components/resultado/buscar";
import { Converter } from "@/functions/form-converter";
import { ExameBit as Exame } from "@/interfaces/exame-bit";
import { FormEvent, useState } from "react";
const ResultadoExamePage = () => {
  const [resultado, setResultado] = useState<Exame[] | null>(null);
  const getExame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Converter(e);
    try {
      const q = await fetch("/api/exames/get", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (q.status === 200) {
        const res = await q.json();
        console.log(res);
        setResultado(res);
      } else {
        alert(`Erro ${q.status}: ${q.statusText}`);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <main
      className={`w-full h-[100dvh] flex justify-center ${
        !resultado ? "items-center" : ""
      }`}
    >
      {resultado ? (
        <article className="w-full max-w-[900px]">
          {resultado.map((r, i) => {
            return <ExameBit key={i} data={r} />;
          })}
        </article>
      ) : (
        <Buscar getExame={getExame} />
      )}
    </main>
  );
};

export default ResultadoExamePage;
