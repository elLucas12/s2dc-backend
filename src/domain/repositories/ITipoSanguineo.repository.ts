import { TipoSanguineoModel } from '../entities/TipoSanguineoModel.entity';

export interface ITipoSanguineoRepository {
  registrar(funcionario: TipoSanguineoModel | any): Promise<TipoSanguineoModel>;
  consultarId(id: number): Promise<TipoSanguineoModel>;
  atualizar(
    id: number,
    funcionario: TipoSanguineoModel | any,
  ): Promise<TipoSanguineoModel>;
  deletar(id: number): Promise<TipoSanguineoModel>;
}
