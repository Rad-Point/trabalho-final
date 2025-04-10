export class ID {
  static gerar() {
    const p1 = Math.random().toString().substring(2, 9);
    return `R${p1}`;
  }
}
