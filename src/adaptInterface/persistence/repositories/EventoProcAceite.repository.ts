import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { EventoProcAceiteModel } from "src/domain/entities/EventoProcAceiteModel.entity";
import { EventoProcAceite } from "../entities/EventoProcAceite.entity";
import { IEventoProcAceiteRepository } from "src/domain/repositories/IEventoProcAceite.repository";

@Injectable()
@Dependencies(getRepositoryToken(EventoProcAceite))
export class EventoProcAceiteRepository implements IEventoProcAceiteRepository {
  constructor(
    private readonly eventosProcAceite: any,
  ) { }

  public async registrar(eventoProcAceite: EventoProcAceiteModel | any): Promise<EventoProcAceiteModel> {
    const resp = await this.eventosProcAceite.save(eventoProcAceite);
    return EventoProcAceiteRepository.createFromObject(resp);
  }

  public async consultarId(id: number): Promise<EventoProcAceiteModel> {
    const resp = await this.eventosProcAceite.findOneBy({id});
    return EventoProcAceiteRepository.createFromObject(resp);
  }

  public async atualizar(
    id: number,
    eventoProcAceite: EventoProcAceiteModel | any,
  ): Promise<EventoProcAceiteModel> {
    const procAceiteAlvo = await this.eventosProcAceite.findOneBy({id});
    if (!procAceiteAlvo) return procAceiteAlvo;
    const resp = await this.eventosProcAceite.save(eventoProcAceite);
    return EventoProcAceiteRepository.createFromObject(resp);
  }

  public async deletar(id: number): Promise<EventoProcAceiteModel> {
    const resp = await this.eventosProcAceite.delete(id);
    return EventoProcAceiteRepository.createFromObject(resp);
  }

  static createFromObject(obj: {
    id: number,
    titulo: string,
    descricao: string,
    corpo: string,
    data: Date,
    criadoEm: Date,
    atualizadoEm: Date,
  }) {
    if (!obj) {
      return obj;
    }
    return new EventoProcAceiteModel(
      obj.id,
      obj.titulo,
      obj.data,
      obj.descricao,
      obj.corpo,
      obj.criadoEm,
      obj.atualizadoEm,
    );
  }
}