"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExameBit, exameTypes } from "@/interfaces/exame-bit";
import { useState } from "react";
const CriarExame = () => {
  const type = exameTypes;
  const [data, setData] = useState<ExameBit[]>([]);
  const [dialog, setDialog] = useState<boolean>(false);
  return (
    <main className="flex flex-col items-center p-8">
      {data.map((d, i) => {
        return <p key={i}>{d.content}</p>;
      })}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="text-foreground bg-accent hover:bg-muted border border-border cursor-pointer"
            onClick={() => {}}
          >
            Adicionar trecho
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Adicionar Trecho</DialogTitle>
            <select className="appearance-none outline-none border border-border my-1 rounded-sm px-2 py-1">
              {type.map((t, i) => {
                return (
                  <option className="appearance-none bg-background" key={i}>
                    {t}
                  </option>
                );
              })}
            </select>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default CriarExame;
