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
  const [data, setData] = useState<ExameBit[]>([]);
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
              />
            );
          case "image":
            return (
              <>
                {d.uploaded ? (
                  <Image key={i} src={d.content} alt="Imagem" fill />
                ) : (
                  <Input
                    key={i}
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files);
                      d.uploaded = true;
                    }}
                  />
                )}
              </>
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
                        ? { content: "", type: t, Upload: false }
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
