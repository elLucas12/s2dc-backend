import { MedicamentoRegistradoModel } from "./MedicamentoRegistradoModel.entity";

export class AlergiaRegistradaModel {
  id: number;
  nome: string;
  alimentosRelacionados: string;
  // medicamentosRegistrados: MedicamentoRegistradoModel[];

  constructor(
    id: number,
    nome: string,
    alimentosRelacionados: string,
    // medicamentosRegistrados: MedicamentoRegistradoModel[],
  ) {
    this.id = id;
    this.nome = nome;
    this.alimentosRelacionados = alimentosRelacionados;
    // this.medicamentosRegistrados = medicamentosRegistrados;
  }
}
