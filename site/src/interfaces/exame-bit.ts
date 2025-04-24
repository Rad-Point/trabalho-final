export type ExameBit =
  | { type: "paragraph"; content: string }
  | { type: "image"; content: string; uploaded: boolean };

export type ExameTypes = "paragraph" | "image";
