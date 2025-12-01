export class EventoProcAceiteModel {
  id: number;
  titulo: string;
  data: Date;
  descricao: string;
  corpo: string;
  criadoEm: Date;
  atualizadoEm: Date;

  constructor(
    id: number,
    titulo: string,
    data: Date,
    descricao: string,
    corpo: string,
    criadoEm: Date,
    atualizadoEm: Date,
  ) {
    this.id = id;
    this.titulo = titulo;
    this.data = data;
    this.descricao = descricao;
    this.corpo = corpo;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
