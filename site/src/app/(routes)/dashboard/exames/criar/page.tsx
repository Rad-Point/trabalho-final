"use client";
import { Input, TextArea } from "@/components/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { translateType } from "@/functions/translaste-types";
import { ExameBit, exameTypes } from "@/interfaces/exame-bit";
import Image from "next/image";
import { useState } from "react";
const CriarExame = () => {
  const type = exameTypes;
  const [data, setData] = useState<ExameBit[]>([
    { type: "paragraph", content: "" },
  ]);
  const uploadImage = (e: any, i: number) => {
    e.preventDefault();
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const updated: ExameBit[] = [...data];
          if (updated[i].type === "image") {
            updated[i].content = reader.result as string;
            updated[i].uploaded = true;
            setData(updated);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  return (
    <main className="flex flex-col items-center gap-2 p-8">
      {data.map((d, i) => {
        switch (d.type) {
          case "paragraph":
            return (
              <TextArea
                key={i}
                className="w-full h-80 border border-border"
                children={d.content}
                onChange={(e) => {
                  const newData = d;
                  newData.content = e.target.value;
                  setData((prevState) => [
                    ...prevState.slice(0, i),
                    newData,
                    ...prevState.slice(i + 1),
                  ]);
                }}
              />
            );
          case "image":
            return (
              <div
                className="relative p-4 flex justify-center items-center w-1/3 aspect-square bg-accent rounded-2xl"
                key={i}
              >
                <Button
                  className="absolute top-4 right-4"
                  variant={"destructive"}
                  onClick={() => {
                    setData((prevState) => [
                      ...prevState.slice(0, i),
                      ...prevState.slice(i + 1),
                    ]);
                  }}
                >
                  X
                </Button>
                {d.uploaded ? (
                  <>
                    <Image
                      src={d.content}
                      alt="Imagem"
                      fill
                      objectFit="contain"
                    />
                  </>
                ) : (
                  <Button
                    className="w-full h-full bg-accent border-4 border-muted border-dotted hover:bg-accent text-foreground"
                    onClick={(e) => {
                      uploadImage(e, i);
                    }}
                  >
                    Selecionar arquivos
                  </Button>
                )}
              </div>
            );
        }
      })}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-foreground bg-accent hover:bg-muted border border-border cursor-pointer">
            Adicionar trecho
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center gap-4">
            <DialogTitle className="text-center">Adicionar Trecho</DialogTitle>
            {type.map((t, i) => {
              return (
                <Button
                  key={i}
                  className="w-full max-w-32 text-foreground bg-accent hover:bg-muted border border-border cursor-pointer"
                  onClick={() => {
                    const newData = [
                      ...data,
                      t === "image"
                        ? { content: "", type: t, uploaded: false }
                        : { content: "", type: t },
                    ];
                    setData(newData);
                  }}
                >
                  {translateType(t)}
                </Button>
              );
            })}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default CriarExame;
