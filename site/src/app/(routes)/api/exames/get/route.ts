import { readdirSync, readFileSync } from "fs";
import path from "path";
import JSZip from "jszip";
export const POST = async (req: Request) => {
  const { numero, senha } = await req.json();
  const dirPath = path.resolve(process.cwd(), "exames");
  const dir = readdirSync(dirPath).filter((p) => p !== "temp");
  for (let i = 0; i < dir.length; i++) {
    const subPath = readdirSync(`${dirPath}/${dir[i]}`);
    if (subPath.includes(`${numero}-${senha}.txt`)) {
      const result = subPath.filter((p) => p !== `${numero}-${senha}.txt`);
      const zip = new JSZip();
      for (let j = 0; j < result.length; j++) {
        zip.file(result[j], readFileSync(`${dirPath}/${dir[i]}/${result[j]}`));
      }
      const blob = await zip.generateAsync({ type: "blob" });
      return new Response(blob, {
        headers: { "Content-Type": "application/zip" },
        status: 200,
      });
    }
  }
  return new Response(JSON.stringify(""), {
    headers: { "Content-Type": "application/json" },
    status: 404,
  });
};
