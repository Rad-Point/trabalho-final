"use client";
import { useState } from "react";
import { Input, TextArea } from "@/components/input";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import gerarLaudo from "@/functions/gerar-laudo";
import formatCPF from "@/functions/format-CPF";
import { redirect } from "next/navigation";
const GerarLaudoPage = () => {
  const print = (type: string) => {
    if (!name || !CPF || !text) return;
    gerarLaudo({ name, CPF, text, type });
    redirect(`/dashboard/exames/anexar-imagens/${name.replaceAll(" ", "-")}`);
  };
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [CPF, setCPF] = useState<number>(0);

  return (
    <main className="w-full h-[100dvh] overflow-hidden gap-6">
      <Wrapper className="w-11/12 h-[calc(100dvh-3rem)] flex flex-col items-center border border-border gap-2 my-6">
        <div className="flex justify-center">
          <p className="inline">Atesto que o senhor(a) </p>
          <Input
            className="inline border-b-2 border-foreground text-center"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="inline">, Inscrito no CPF </p>
          <Input
            className="inline border-b-2 border-foreground text-center"
            type="text"
            value={CPF !== 0 ? formatCPF(CPF) : ""}
            onChange={(e) =>
              setCPF(Number(e.target.value.replace(/\D/g, "").substring(0, 11)))
            }
          />
          <p className="inline">, apresenta o seguinte quadro:</p>
        </div>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full resize-none p-2"
        />
        <div className="w-full flex justify-center flex-wrap gap-2">
          <div>
            <Button
              disabled={!name || !CPF || !text}
              className="mx-[50%] translate-x-[-50%] bg-background text-foreground border border-border hover:bg-accent cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                print("save");
              }}
            >
              Salvar
            </Button>
          </div>
          <div>
            <Button
              disabled={!name || !CPF || !text}
              className="mx-[50%] translate-x-[-50%] bg-background text-foreground border border-border hover:bg-accent cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                print("save and print");
              }}
            >
              Salvar e imprimir
            </Button>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};
export default GerarLaudoPage;
