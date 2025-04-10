"use client";
import Buscar from "@/components/resultado/buscar";
import { Converter } from "@/functions/form-converter";
import { FormEvent, useState } from "react";
const ResultadoExamePage = () => {
  const [resultado, setResultado] = useState<
    { content: string; type: "text" | "img" }[] | null
  >(null);
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
      className={`w-full h-[100dvh] ${
        !resultado ? "flex justify-center items-center" : ""
      }`}
    >
      {resultado ? (
        <div className="w-11/12 max-w-[1100px] m-auto">
          {resultado.map((r, index) => {
            switch (r.type) {
              case "text":
                return <p>{r.content}</p>;
              case "img":
                return <img src={r.content} />;
              default:
                break;
            }
          })}
        </div>
      ) : (
        <Buscar getExame={getExame} />
      )}
    </main>
  );
};

export default ResultadoExamePage;
