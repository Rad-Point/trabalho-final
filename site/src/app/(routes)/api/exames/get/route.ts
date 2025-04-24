import { readdirSync, readFileSync } from "fs";
import path from "path";
export const POST = async (req: Request) => {
  const { numero, senha } = await req.json();
  const dirPath = path.resolve(process.cwd(), "exames");
  const dir = readdirSync(dirPath).filter((p) => {
    return p !== "temp";
  });
  let exame;
  for (let i = 0; i < dir.length; i++) {
    const subPath = readdirSync(`${dirPath}/${dir[i]}`);
    console.log(subPath);
    if (subPath.includes(`${numero}-${senha}.txt`)) {
    } else {
    }
  }
  return new Response(JSON.stringify(""), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};
