export class FuncionarioInexistenteError extends Error {
  constructor(mensagem: string, opcoes: ErrorOptions | undefined) {
    super(mensagem, opcoes);
    this.name = this.constructor.name;
  }
}