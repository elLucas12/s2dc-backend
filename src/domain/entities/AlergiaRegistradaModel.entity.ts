export class AlergiaRegistradaModel {
  id: number;
  nome: string;
  alimentosRelacionados: string;
  cadastroClinico: number;

  constructor(
    id: number,
    nome: string,
    alimentosRelacionados: string,
    cadastroClinico: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.alimentosRelacionados = alimentosRelacionados;
    this.cadastroClinico = cadastroClinico;
  }
}
