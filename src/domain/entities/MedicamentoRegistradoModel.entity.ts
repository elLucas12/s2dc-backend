export class MedicamentoRegistradoModel {
  id: number;
  nome: string;
  dosagemMg: number;

  constructor(
    id: number,
    nome: string,
    dosagemMg: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.dosagemMg = dosagemMg;
  }
}
