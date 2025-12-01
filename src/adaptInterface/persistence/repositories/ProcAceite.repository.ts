import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { ProcAceite } from "../entities/ProcAceite.entity";
import { IProcAceiteRepository } from "src/domain/repositories/IProcAceite.repository";
import { ProcAceiteModel } from "src/domain/entities/ProcAceiteModel.entity";
import { EventoProcAceiteModel } from "src/domain/entities/EventoProcAceiteModel.entity";

@Injectable()
@Dependencies(getRepositoryToken(ProcAceite))
export class ProcAceiteRepository implements IProcAceiteRepository {
  constructor(
    private readonly procsAceite: any,
  ) { }

  public async registrar(procAceite: ProcAceiteModel | any): Promise<ProcAceiteModel> {
    const resp = await this.procsAceite.save(procAceite);
    return ProcAceiteRepository.createFromObject(resp);
  }

  public async consultarId(id: number): Promise<ProcAceiteModel> {
    const resp = await this.procsAceite.findOneBy({id});
    return ProcAceiteRepository.createFromObject(resp);
  }

  public async atualizar(
    id: number,
    procAceite: ProcAceiteModel | any,
  ): Promise<ProcAceiteModel> {
    const procAceiteAlvo = await this.procsAceite.findOneBy({id});
    if (!procAceiteAlvo) return procAceiteAlvo;
    const resp = await this.procsAceite.save(procAceite);
    return ProcAceiteRepository.createFromObject(resp);
  }

  public async deletar(id: number): Promise<ProcAceiteModel> {
    const resp = await this.procsAceite.delete(id);
    return ProcAceiteRepository.createFromObject(resp);
  }

  static createFromObject(obj: {
    id: number,
    dataFim: Date,
    dataInicio: Date,
    criadoEm: Date,
    atualizadoEm: Date,
    eventosProcAceite: EventoProcAceiteModel[],
  }) {
    if (!obj) {
      return obj;
    }
    return new ProcAceiteModel(
      obj.id,
      obj.dataFim,
      obj.dataInicio,
      obj.criadoEm,
      obj.atualizadoEm,
      obj.eventosProcAceite,
    );
  }
}