import { unlinkSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import unzipper from "unzipper";
export const POST = async (req: Request) => {
  const originUrl = req.headers.get("Referer")?.split("/");
  const patient = originUrl?.[originUrl?.length - 1];
  try {
    if (!req.body) {
      return new Response(
        JSON.stringify({ error: "No data found in request." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const data = await req.blob();
    const buffer = await data.arrayBuffer();
    if (!data.type.startsWith("application/zip")) {
      return new Response(
        JSON.stringify({ error: "The uploaded file is not a valid ZIP." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const tempDir = path.resolve(process.cwd(), "exames", "temp");
    if (!existsSync(tempDir)) {
      mkdirSync(tempDir, { recursive: true });
    }
    async function main(folder: ArrayBuffer) {
      if (!patient) {
        return new Response(
          JSON.stringify({ error: "No patient found in request." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const filePath = `${tempDir}/${patient}.zip`;
      console.log(`Writing zip file to: ${filePath}`);
      await writeFileSync(filePath, Buffer.from(folder));
      try {
        const directory = await unzipper.Open.file(filePath);
        console.log(`Zip file opened: ${filePath}`);
        directory.files.forEach((file) => {
          console.log(`Found file in zip: ${file.path}`);
        });
        await directory.extract({
          path: `exames/${patient}`,
        });
        console.log(`Extraction completed for zip file: ${filePath}`);
        unlinkSync(filePath);
        console.log(`Temporary zip file deleted: ${filePath}`);
      } catch (err) {
        console.error(`Error during extraction of ${filePath}:`, err);
        // @ts-expect-error err.message is a string
        throw new Error(`Error extracting zip file: ${err.message}`);
      }
    }
    await main(buffer);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Error processing the zip file:", err);
    return new Response(
      // @ts-expect-error err.message is a string
      JSON.stringify({ error: "Erro ao buscar o laudo: " + err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
