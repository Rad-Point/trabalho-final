export class ID {
  static gerar() {
    const p1 = Math.random().toString().substring(2, 9);
    return p1;
  }
  static gerarNumero(n?: number) {
    let p1;
    if (n) {
      p1 = Math.floor(Math.random() * Math.pow(10, n - 1));
    } else {
      p1 = Math.floor(Math.random() * 10000000000);
    }
    return p1;
  }
}
