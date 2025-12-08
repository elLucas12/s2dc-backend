import { TipoSanguineoModel } from '../entities/TipoSanguineoModel.entity';

export interface ITipoSanguineoRepository {
  registrar(tipoSanguineo: TipoSanguineoModel | any): Promise<TipoSanguineoModel>;
  consultarId(id: number): Promise<TipoSanguineoModel>;
  consultarParcial(tipoSanguineo: any): Promise<TipoSanguineoModel>;
  atualizar(
    id: number,
    tipoSanguineo: TipoSanguineoModel | any,
  ): Promise<TipoSanguineoModel>;
  deletar(id: number): Promise<TipoSanguineoModel>;
}
