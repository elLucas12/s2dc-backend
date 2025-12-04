export class ProcAceiteExistenteError extends Error {
  constructor(mensagem: string, opcoes?: ErrorOptions) {
    super(mensagem, opcoes);
    this.name = this.constructor.name;
  }
}