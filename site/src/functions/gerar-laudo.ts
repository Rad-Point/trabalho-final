import formatCPF from "./format-CPF";

const enviarLaudo = async (data: HTMLElement) => {
  const innerHTML = data.innerHTML;
  const response = await fetch("/api/laudos/set", {
    method: "POST",
    headers: {
      "Content-Type": "text/html",
    },
    body: new Blob([innerHTML], { type: "text/html" }),
  });
  const res = await response.json();
  return res;
};
const gerarLaudo = ({
  name,
  CPF,
  text,
  type,
}: {
  name: string;
  CPF: number;
  text: string;
  type: string;
}) => {
  const win = window.open("", "", "height=1123,width=794");
  if (!win) return;
  const laudoContent = `
    <html>
      <head>
        <title>Laudo Médico - ${name}</title>
      </head>
      <body style="">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: sans-serif;
          }
          body {
            padding: 1rem;
          }
        </style>
        <p>Atesto que o(a) senhor(a) ${name}, Inscrito no CPF ${formatCPF(
    CPF
  )}, apresenta o seguinte quadro:</p>
        <p>${text}</p>
      </body>
    </html>
  `;
  win.document.write(laudoContent);
  enviarLaudo(win.document.body);
  if (type === "save and print") {
    win.print();
  }
  win.close();
};
export default gerarLaudo;
