import { MedicamentoRegistradoModel } from './MedicamentoRegistradoModel.entity';

export class CirurgiaRegistradaModel {
  id: number;
  nome: string;
  razao: string;
  dataOperacao: Date;
  cadastroClinico: number;
  medicamentosRegistrados: MedicamentoRegistradoModel[];

  constructor(
    id: number,
    nome: string,
    razao: string,
    dataOperacao: Date,
    cadastroClinico: number,
    medicamentosRegistrados: MedicamentoRegistradoModel[],
  ) {
    this.id = id;
    this.nome = nome;
    this.razao = razao;
    this.dataOperacao = dataOperacao;
    this.cadastroClinico = cadastroClinico;
    this.medicamentosRegistrados = medicamentosRegistrados;
  }
}
