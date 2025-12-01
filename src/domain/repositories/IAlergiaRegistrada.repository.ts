import { AlergiaRegistradaModel } from '../entities/AlergiaRegistradaModel.entity';

export interface IAlergiaRegistradaRepository {
  registrar(alergiaRegistrada: AlergiaRegistradaModel | any): Promise<AlergiaRegistradaModel>;
  consultarId(id: number): Promise<AlergiaRegistradaModel>;
  atualizar(
    id: number,
    alergiaRegistrada: AlergiaRegistradaModel | any,
  ): Promise<AlergiaRegistradaModel>;
  deletar(id: number): Promise<AlergiaRegistradaModel>;
}
