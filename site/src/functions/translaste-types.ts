import { ExameTypes } from "@/interfaces/exame-bit";

export const translateType = (d: ExameTypes) => {
  switch (d) {
    case "paragraph":
      return "Parágrafo";
    case "image":
      return "Imagem";
    default:
      return "Erro";
  }
};
