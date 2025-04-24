import { writeFileSync } from "fs";
import path from "path";
import { ID } from "@/functions/id";
export const POST = async (req: Request) => {
  try {
    const patient = await req.json();
    const filePath = `${path.join(process.cwd())}/exames/${patient}`;
    const [exame, senha] = [`R-${ID.gerar()}`, `R${ID.gerar()}`];
    writeFileSync(`${filePath}/${exame}-${senha}.txt`, "");
    return new Response(JSON.stringify(""), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Erro ao salvar o exame:", err);
    return new Response(JSON.stringify({ error: "Erro ao salvar o exame." }), {
      status: 500,
    });
  }
};
