export type ExameBit =
  | { type: "paragraph"; content: string }
  | { type: "image"; content: string; uploaded: boolean };

export const exameTypes = ["paragraph", "image"] as const;
