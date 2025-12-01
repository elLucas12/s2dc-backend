import { AlergiaRegistradaModel } from '../entities/AlergiaRegistradaModel.entity';

export interface IAlergiaRegistradaRepository {
  registrar(funcionario: AlergiaRegistradaModel | any): Promise<AlergiaRegistradaModel>;
  consultarId(id: number): Promise<AlergiaRegistradaModel>;
  atualizar(
    id: number,
    funcionario: AlergiaRegistradaModel | any,
  ): Promise<AlergiaRegistradaModel>;
  deletar(id: number): Promise<AlergiaRegistradaModel>;
}
