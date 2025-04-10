import { FormEvent } from "react";
export const Converter = ({ currentTarget }: FormEvent<HTMLFormElement>) => {
  const form = new FormData(currentTarget);
  const data = Object.fromEntries(form);
  return data;
};
