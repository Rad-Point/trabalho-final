import { ExameBit as Exame } from "@/interfaces/exame-bit";
import Image from "next/image";
interface ExameBitProps {
  data: Exame;
}
const ExameBit = ({ data }: ExameBitProps) => {
  console.log(data);
  switch (data.type) {
    case "paragraph":
      return <p>{data.content}</p>;
    case "image":
      return (
        <div className="w-full h-96 my-4 relative">
          <Image
            src={data.content}
            objectPosition="static"
            fill
            objectFit="contain"
            alt="Imagem"
          />
        </div>
      );
  }
};

export default ExameBit;
