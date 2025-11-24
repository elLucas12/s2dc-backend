import { AlergiaRegistradaModel } from '../entities/AlergiaRegistradaModel.entity';

export interface AlergiaRegistradaRepository {
  registrar(
    alergiaRegistrada: AlergiaRegistradaModel | any,
  ): Promise<AlergiaRegistradaModel>;
  consultarId(id: number): Promise<AlergiaRegistradaModel>;
  consultar(
    alergiaRegistrada: AlergiaRegistradaModel | any,
  ): Promise<AlergiaRegistradaModel>;
  atualizar(
    id: number,
    alergiaRegistrada: AlergiaRegistradaModel | any,
  ): Promise<AlergiaRegistradaModel>;
  deletar(id: number): Promise<AlergiaRegistradaModel>;
}
