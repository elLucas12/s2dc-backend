import { EventoProcAceiteModel } from '../entities/EventoProcAceiteModel.entity';

export interface IEventoProcAceiteRepository {
  registrar(eventoProcAceite: EventoProcAceiteModel | any): Promise<EventoProcAceiteModel>;
  consultarId(id: number): Promise<EventoProcAceiteModel>;
  atualizar(
    id: number,
    funcionario: EventoProcAceiteModel | any,
  ): Promise<EventoProcAceiteModel>;
  deletar(id: number): Promise<EventoProcAceiteModel>;
}
