export class MedicamentoRegistradoModel {
  id: number;
  nome: string;
  dosagemMg: number;
  cadastroClinico: number;
  cirurgiaRegistrada: number;
  doencaRegistrada: number;
  alergiaRegistrada: number;

  constructor(
    id: number,
    nome: string,
    dosagemMg: number,
    cadastroClinico: number,
    cirurgiaRegistrada: number,
    doencaRegistrada: number,
    alergiaRegistrada: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.dosagemMg = dosagemMg;
    this.cadastroClinico = cadastroClinico;
    this.cirurgiaRegistrada = cirurgiaRegistrada;
    this.doencaRegistrada = doencaRegistrada;
    this.alergiaRegistrada = alergiaRegistrada;
  }
}
