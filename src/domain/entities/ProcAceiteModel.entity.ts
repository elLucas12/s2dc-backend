import { EventoProcAceiteModel } from "./EventoProcAceiteModel.entity";

export class ProcAceiteModel {
  id: number;
  cancelado: boolean;
  aprovado: boolean;
  dataFim: Date;
  dataInicio: Date;
  criadoEm: Date;
  atualizadoEm: Date;
  eventosProcAceite: EventoProcAceiteModel[];

  constructor(
    id: number,
    cancelado: boolean,
    aprovado: boolean,
    dataFim: Date,
    dataInicio: Date,
    criadoEm: Date,
    atualizadoEm: Date,
    eventosProcAceite: EventoProcAceiteModel[],
  ) {
    this.id = id;
    this.cancelado = cancelado;
    this.aprovado = aprovado;
    this.dataFim = dataFim;
    this.dataInicio = dataInicio;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
    this.eventosProcAceite = eventosProcAceite;
  }
}
