import { MedicamentoRegistradoModel } from './MedicamentoRegistradoModel.entity';

export class DoencaRegistradaModel {
  id: number;
  nome: string;
  cid: string;
  dataConhecimento: Date;
  // medicamentosRegistrados: MedicamentoRegistradoModel[];

  constructor(
    id: number,
    nome: string,
    cid: string,
    dataConhecimento: Date,
    // medicamentosRegistrados: MedicamentoRegistradoModel[],
  ) {
    this.id = id;
    this.nome = nome;
    this.cid = cid;
    this.dataConhecimento = dataConhecimento;
    // this.medicamentosRegistrados = medicamentosRegistrados;
  }
}
