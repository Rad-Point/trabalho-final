import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";
interface ImageDialogProps {
  files: File[];
  previewUrls: string[];
}
const ImageDialog = ({ files, previewUrls }: ImageDialogProps) => {
  const [curImage, setCurImage] = useState<number>(0);
  const trigger = () => {
    if (files.length < 4) {
      return (
        <div className="w-full max-w-64 bg-accent flex flex-col gap-1 p-1 rounded-2xl">
          {files.map((file, i) => (
            <div
              key={i}
              onClick={() => {
                setCurImage(i);
              }}
              className="w-full aspect-square p-1 relative"
            >
              <Image
                className="rounded-2xl cursor-pointer"
                src={previewUrls[i]}
                alt={file.name}
                fill
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="w-full max-w-64 grid grid-cols-2 grid-rows-2 p-1 gap-1 aspect-square bg-accent rounded-2xl relative cursor-pointer">
          {files.length === 4
            ? files.map((file, i) => (
                <div key={i} className="w-full aspect-square relative">
                  <Image
                    className="rounded-xl"
                    src={previewUrls[i]}
                    alt={file.name}
                    fill
                    objectFit="cover"
                  />
                </div>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full aspect-square relative">
                  <Image
                    className="rounded-xl"
                    src={previewUrls[i]}
                    alt={files[i].name}
                    fill
                    objectFit="cover"
                  />
                  {i === 3 && (
                    <div className="absolute rounded-xl top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                      <h2 className="text-white">+{files.length - 4}</h2>
                    </div>
                  )}
                </div>
              ))}
        </div>
      );
    }
  };
  const content = (img?: number) => {
    return (
      <div className="w-full max-w-[1100px] aspect-square flex flex-col items-center relative">
        {files.length < 4 ? (
          <Image
            src={previewUrls[img ?? 0]}
            alt={files[img ?? 0].name}
            fill
            objectFit="contain"
          />
        ) : (
          <div className="w-full max-w-[1100px] flex flex-col gap-2 relative">
            {files.map((file, i) => (
              <div
                key={i}
                className="h-[calc(100vh-5rem)] aspect-square flex flex-col items-center relative"
              >
                <Image
                  src={previewUrls[i]}
                  alt={file.name}
                  fill
                  objectFit="contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger()}</DialogTrigger>
      <DialogContent className="w-11/12 max-w-[1100px] h-[calc(100vh-4rem)] p-2 block fixed border-0 rounded-none overflow-x-hidden gap-2 overflow-y-auto">
        <DialogTitle className="w-full h-0 overflow-hidden">Imagem</DialogTitle>
        {content(curImage)}
      </DialogContent>
    </Dialog>
  );
};
export default ImageDialog;
