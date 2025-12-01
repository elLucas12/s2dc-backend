export class AlergiaRegistradaModel {
  id: number;
  nome: string;
  alimentosRelacionados: string;

  constructor(
    id: number,
    nome: string,
    alimentosRelacionados: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.alimentosRelacionados = alimentosRelacionados;
  }
}
