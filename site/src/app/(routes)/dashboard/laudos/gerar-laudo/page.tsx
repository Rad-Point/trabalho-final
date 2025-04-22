"use client";
import { useEffect, useState } from "react";
import { Input, TextArea } from "@/components/input";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import gerarLaudo from "@/functions/gerar-laudo";
const GerarLaudoPage = () => {
  useEffect(() => {
    window.onbeforeprint = (e) => {
      e.preventDefault();
    };
  }, []);
  const print = (e: React.MouseEvent) => {
    e.preventDefault();
    const win = window.open("", "", "height=1123,width=794");
    if (!win || !name || !CPF || !text) return;
    gerarLaudo(win, { name, CPF, text });
  };
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [CPF, setCPF] = useState<number>(0);
  const formatCPF = (value: number) => {
    return value
      .toString()
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <main className="w-full h-[100dvh] overflow-hidden gap-6">
      <Wrapper className="items-center border border-border gap-2 my-6">
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
          className="w-full h-[480px] resize-none p-2"
        />
        <Button
          disabled={!name || !CPF || !text}
          className="mx-[50%] translate-x-[-50%] bg-background text-foreground border border-border hover:bg-accent cursor-pointer"
          onClick={print}
        >
          Imprimir
        </Button>
      </Wrapper>
    </main>
  );
};
export default GerarLaudoPage;
