export class DoencaExistenteError extends Error {
  constructor(mensagem: string, opcoes?: ErrorOptions) {
    super(mensagem, opcoes);
    this.name = this.constructor.name;
  }
}