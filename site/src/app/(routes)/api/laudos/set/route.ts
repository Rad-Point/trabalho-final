import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
export const POST = async (req: Request) => {
  try {
    const reader = req.body?.getReader();
    const chunks: Uint8Array[] = [];
    if (!reader) {
      return new Response("No body found", { status: 400 });
    }
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const rawHtml = Buffer.concat(chunks).toString("utf-8");
    // @ts-expect-error 'rawHtml' is already validated
    const patient = rawHtml
      .match(/<p>(.*)<\/p>/)[1]
      .split(", ")[0]
      .toUpperCase()
      .replace("Atesto que o(a) senhor(a) ".toUpperCase(), "")
      .replaceAll(" ", "-");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const filePath = path.resolve(
      process.cwd(),
      `exames/${patient}/laudo.html`
    );
    const pdfFilePath = filePath.replace(".html", ".pdf");
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, rawHtml, "utf-8");
    const fileUrl = `file://${filePath}`;
    await page.goto(fileUrl, { waitUntil: "networkidle2" });
    await page.pdf({ path: pdfFilePath });
    await browser.close();
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error processing request:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
