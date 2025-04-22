"use client";
import { useState } from "react";
import Wrapper from "@/components/wrapper";
import ImageDialog from "@/components/image-dialog";
const CriarExamePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
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
    <main className="w-full min-h-[100dvh] py-12 flex flex-col items-center">
      <Wrapper className="flex flex-col gap-4 items-center">
        <textarea className="w-full h-96 resize-none border border-border rounded-2xl outline-none p-2"></textarea>
        <div className="w-full flex flex-col items-center gap-2">
          {files.length > 0 ? (
            <ImageDialog files={files} previewUrls={previewUrls} />
          ) : (
            <div
              className="w-full h-32 bg-accent"
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
            ></div>
          )}
        </div>
      </Wrapper>
    </main>
  );
};

export default CriarExamePage;
