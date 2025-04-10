type ExameTypes = "paragraph" | "image";
export const exameTypes: ExameTypes[] = ["paragraph", "image"];
export interface ExameBit {
  content: string;
  type: ExameTypes;
}
