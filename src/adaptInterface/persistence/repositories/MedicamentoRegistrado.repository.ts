import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MedicamentoRegistrado } from "../entities/MedicamentoRegistrado.entity";
import { IMedicamentoRegistradoRepository } from "src/domain/repositories/IMedicamentoRegistrado.repository";
import { MedicamentoRegistradoModel } from "src/domain/entities/MedicamentoRegistradoModel.entity";

@Injectable()
@Dependencies(getRepositoryToken(MedicamentoRegistrado))
export class MedicamentoRegistradoRepository implements IMedicamentoRegistradoRepository {
  constructor(
    private readonly medicamentosRegistrados: any,
  ) { }

  public async registrar(medicamentoRegistrado: MedicamentoRegistradoModel | any): Promise<MedicamentoRegistradoModel> {
    const resp = await this.medicamentosRegistrados.save(medicamentoRegistrado);
    return MedicamentoRegistradoRepository.createFromObject(resp);
  }

  public async consultarId(id: number): Promise<MedicamentoRegistradoModel> {
    const resp = await this.medicamentosRegistrados.findOneBy({id});
    return MedicamentoRegistradoRepository.createFromObject(resp);
  }

  public async atualizar(
    id: number,
    medicamentoRegistrado: MedicamentoRegistradoModel | any,
  ): Promise<MedicamentoRegistradoModel> {
    const medicamentoRegistradoAlvo = await this.medicamentosRegistrados.findOneBy({id});
    if (!medicamentoRegistradoAlvo) return medicamentoRegistradoAlvo;
    const resp = await this.medicamentosRegistrados.save(medicamentoRegistrado);
    return MedicamentoRegistradoRepository.createFromObject(resp);
  }

  public async deletar(id: number): Promise<MedicamentoRegistradoModel> {
    const resp = await this.medicamentosRegistrados.delete(id);
    return MedicamentoRegistradoRepository.createFromObject(resp);
  }

  static createFromObject(obj: {
    id: number,
    nome: string,
    dosagemMg: number,
  }) {
    if (!obj) {
      return obj;
    }
    return new MedicamentoRegistradoModel(
      obj.id,
      obj.nome,
      obj.dosagemMg,
    );
  }
}