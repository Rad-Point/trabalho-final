"use client";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import ImageDialog from "@/components/image-dialog";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
const CriarExamePage = () => {
  const { paciente } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);
  const attach = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one image to upload.");
      return;
    }
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.name, file);
    });
    try {
      const blob = await zip.generateAsync({ type: "blob" });
      console.log(JSON.stringify(blob));
      const q = await fetch("/api/imagens/set", {
        method: "POST",
        body: blob,
        headers: {
          "Content-Type": "application/zip",
        },
      });
      const res = await q.json();
      if (res.status === 200) {
        const i = await fetch("/api/exames/set", {
          method: "POST",
          body: JSON.stringify(paciente),
        });
        const r = await i.json();
        console.log(r);
      }
    } catch (err) {
      console.error("Error uploading images:", err);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const readEntriesRecursively = (entry: any, path = ""): Promise<File[]> => {
    return new Promise((resolve) => {
      if (entry.isFile) {
        entry.file((file: File) => {
          // @ts-expect-error file.fullPath is not a standard property, but it's needed for our use case
          file.fullPath = path + file.name;
          if (file.type.startsWith("image/")) resolve([file]);
          else resolve([]);
        });
      } else if (entry.isDirectory) {
        const dirReader = entry.createReader();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const entries: any[] = [];
        const readAllEntries = () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dirReader.readEntries(async (results: any[]) => {
            if (!results.length) {
              const promises = entries.map((e) =>
                readEntriesRecursively(e, path + entry.name + "/")
              );
              const nestedFiles = await Promise.all(promises);
              resolve(nestedFiles.flat());
            } else {
              entries.push(...results);
              readAllEntries();
            }
          });
        };
        readAllEntries();
      } else {
        resolve([]);
      }
    });
  };
  return (
    <main className="w-screen h-screen p-32 flex flex-col items-center overflow-x-hidden">
      {files.length > 0 ? (
        <div className="w-screen h-full gap-4">
          <div className="w-full max-w-64 m-auto flex flex-col items-center gap-4">
            <Button
              onClick={() => setFiles([])}
              className="self-end"
              variant={"destructive"}
            >
              X
            </Button>
            <ImageDialog files={files} previewUrls={previewUrls} />
            <Button className="w-full max-w-64 cursor-pointer" onClick={attach}>
              Enviar
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full rounded-4xl bg-[#555555] p-4 cursor-pointer"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.multiple = true;
            input.onchange = (e) => {
              const files = Array.from((e.target as HTMLInputElement).files!);
              const urls = files.map((file) => URL.createObjectURL(file));
              setPreviewUrls(urls);
              setFiles(files);
            };
            input.click();
            input.remove();
          }}
          onDrop={async (e) => {
            e.preventDefault();
            const items = [...e.dataTransfer.items];
            const allFiles: File[] = [];
            for (const item of items) {
              const entry = item.webkitGetAsEntry?.();
              if (entry) {
                const files = await readEntriesRecursively(entry);
                allFiles.push(...files);
              }
            }
            const urls = allFiles.map((file) => URL.createObjectURL(file));
            setPreviewUrls(urls);
            setFiles(allFiles);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
            >
              <path
                d="M10 40C10 31.1634 15.1634 26 24 26H66C74.8366 26 80 31.1634 80 40V60C80 68.8366 74.8366 74 66 74H24C15.1634 74 10 68.8366 10 60V40Z"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M40 10C31.1634 10 26 15.1634 26 24V66C26 74.8366 31.1634 80 40 80H60C68.8366 80 74 74.8366 74 66V24C74 15.1634 68.8366 10 60 10H40Z"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-2xl font-bold text-white">Arraste e solte</p>
            <p className="text-sm font-bold text-white">
              imagens ou pastas aqui
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default CriarExamePage;
