import { DoencaRegistradaModel } from '../entities/DoencaRegistradaModel.entity';

export interface IDoencaRegistradaRepository {
  registrar(funcionario: DoencaRegistradaModel | any): Promise<DoencaRegistradaModel>;
  consultarId(id: number): Promise<DoencaRegistradaModel>;
  atualizar(
    id: number,
    funcionario: DoencaRegistradaModel | any,
  ): Promise<DoencaRegistradaModel>;
  deletar(id: number): Promise<DoencaRegistradaModel>;
}
