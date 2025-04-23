import fs from "fs";
import path from "path";
export const GET = async () => {
  try {
    const laudos = fs
      .readdirSync(path.resolve(process.cwd(), "exames"))
      .filter((l) => l !== "temp");
    return new Response(JSON.stringify(laudos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Erro ao buscar os laudos: " + err }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
export const POST = async (req: Request) => {
  const data = await req.json();
  try {
    const laudoPath = path.resolve(
      process.cwd(),
      `exames/${data.name}/laudo.pdf`
    );
    const laudoBuffer = fs.readFileSync(laudoPath);
    return new Response(laudoBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${data.name}_laudo.pdf"`,
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Erro ao buscar o laudo: " + err }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
