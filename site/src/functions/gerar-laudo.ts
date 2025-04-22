const enviarLaudo = async (data: HTMLElement) => {
  const innerHTML = data.innerHTML;
  const response = await fetch("/api/laudos/set", {
    method: "POST",
    headers: {
      "Content-Type": "text/html",
    },
    body: new Blob([innerHTML], { type: "text/html" }),
  });
  if (response.status === 200) {
    const res = await response.json();
    console.log(res);
  } else {
    console.error("Failed to send laudo. Status:", response.status);
  }
};
const gerarLaudo = (
  win: Window,
  { name, CPF, text }: { name: string; CPF: number; text: string }
) => {
  const laudoContent = `
    <html>
      <head><title>Laudo Médico - ${name}</title></head>
      <body>
        <p style="font-size:18px; padding: 2rem;">Atesto que o senhor(a) ${name}, Inscrito no CPF ${CPF}, apresenta o seguinte quadro:</p>
        <p>${text}</p>
      </body>
    </html>
  `;
  win.document.write(laudoContent);
  enviarLaudo(win.document.body);
  win.print();
  win.close();
};
export default gerarLaudo;
