export class ProcAceiteModel {
  id: number;
  dataFim: Date;
  dataInicio: Date;
  criadoEm: Date;
  atualizadoEm: Date;

  constructor(
    id: number,
    dataFim: Date,
    dataInicio: Date,
    criadoEm: Date,
    atualizadoEm: Date,
  ) {
    this.id = id;
    this.dataFim = dataFim;
    this.dataInicio = dataInicio;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
