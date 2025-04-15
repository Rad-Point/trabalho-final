import fs from "fs";
import path from "path";
import { ID } from "@/functions/id";
export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const exame = ID.gerarNumero();
    const senha = `R-${ID.gerarNumero(8)}`;
    const fileName = `exame-${exame}.json`;
    const dir = path.resolve(process.cwd(), "exames");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(JSON.stringify({ exame, senha }), {
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
