import { MedicamentoRegistradoModel } from './MedicamentoRegistradoModel.entity';

export class CirurgiaRegistradaModel {
  id: number;
  nome: string;
  razao: string;
  dataOperacao: Date;
  // medicamentosRegistrados: MedicamentoRegistradoModel[];

  constructor(
    id: number,
    nome: string,
    razao: string,
    dataOperacao: Date,
    // medicamentosRegistrados: MedicamentoRegistradoModel[],
  ) {
    this.id = id;
    this.nome = nome;
    this.razao = razao;
    this.dataOperacao = dataOperacao;
    // this.medicamentosRegistrados = medicamentosRegistrados;
  }
}
