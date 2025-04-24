"use client";
import Buscar from "@/components/resultado/buscar";
import JSZip from "jszip";
import { Converter } from "@/functions/form-converter";
import { FormEvent, useState } from "react";
import ExameBit from "@/components/exame-bit";
const ResultadoExamePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resultado, setResultado] = useState<any[] | null>(null);

  const getExame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Converter(e);
    try {
      const q = await fetch("/api/exames/get", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (q.status === 200) {
        const res = await q.blob();
        const zip = await JSZip.loadAsync(res);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const exames: any[] = [];
        const files = Object.keys(zip.files);
        for (const path of files) {
          const file = zip.files[path];
          if (!file.dir) {
            const extension = path.split(".").pop()?.toLowerCase();
            if (extension === "json") {
              const content = await file.async("text");
              try {
                const exame = JSON.parse(content);
                exames.push(exame);
              } catch (err) {
                console.warn(`Erro ao parsear JSON de ${path}:`, err);
              }
            } else {
              const blob = await file.async("uint8array");
              const url = URL.createObjectURL(
                new Blob([blob], { type: `application/${extension}` })
              );
              exames.push({
                name: path,
                url,
                type: extension || "arquivo",
              });
            }
          }
        }
        setResultado([
          ...exames.filter((file) => {
            return file.type === "pdf";
          }),
          ...exames.filter((file) => {
            return file.type !== "pdf";
          }),
        ]);
      } else {
        alert(`Erro ${q.status}: ${q.statusText}`);
      }
    } catch (err) {
      console.error("Erro ao buscar exames:", err);
      alert("Erro ao buscar exames. Verifique os dados e tente novamente.");
    }
  };
  return (
    <main
      className={`w-full h-[100dvh] flex justify-center ${
        !resultado ? "items-center" : ""
      }`}
    >
      {resultado ? (
        <article className="w-full max-w-[900px] my-8 flex flex-wrap justify-center">
          {resultado.map((file, i) => (
            <ExameBit key={i} file={file} />
          ))}
        </article>
      ) : (
        <Buscar getExame={getExame} />
      )}
    </main>
  );
};

export default ResultadoExamePage;
