import ImageDialog from "./image-dialog";
interface ExameBitProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any;
}
const ExameBit = ({ file }: ExameBitProps) => {
  console.log(file);
  return (
    <div>
      {file.type === "pdf" ? (
        <div className="w-[900px] aspect-[210/297]">
          <object
            data={file.url}
            width="100%"
            height="100%"
            type="application/pdf"
            title={file.name}
          />
        </div>
      ) : file.type === "png" ||
        file.type === "jpg" ||
        file.type === "webp" ||
        file.type === "jpeg" ? (
        <div className="w-64 my-2 aspect-square relative">
          <ImageDialog files={[file.name]} previewUrls={[file.url]} />
        </div>
      ) : (
        <a href={file.url} download={file.name}>
          Baixar {file.name}
        </a>
      )}
    </div>
  );
};
export default ExameBit;
