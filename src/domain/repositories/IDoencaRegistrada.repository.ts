import { DoencaRegistradaModel } from '../entities/DoencaRegistradaModel.entity';

export interface IDoencaRegistradaRepository {
  registrar(doencaRegistrada: DoencaRegistradaModel | any): Promise<DoencaRegistradaModel>;
  consultarId(id: number): Promise<DoencaRegistradaModel>;
  atualizar(
    id: number,
    doencaRegistrada: DoencaRegistradaModel | any,
  ): Promise<DoencaRegistradaModel>;
  deletar(id: number): Promise<DoencaRegistradaModel>;
}
