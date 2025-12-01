import { ProcAceiteModel } from '../entities/ProcAceiteModel.entity';

export interface IProcAceiteRepository {
  registrar(procAceite: ProcAceiteModel | any): Promise<ProcAceiteModel>;
  consultarId(id: number): Promise<ProcAceiteModel>;
  atualizar(
    id: number,
    procAceite: ProcAceiteModel | any,
  ): Promise<ProcAceiteModel>;
  deletar(id: number): Promise<ProcAceiteModel>;
}
