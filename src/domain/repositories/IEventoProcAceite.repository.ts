import { EventoProcAceiteModel } from '../entities/EventoProcAceiteModel.entity';

export interface IEventoProcAceiteRepository {
  registrar(
    eventoProcAceite: EventoProcAceiteModel | any,
  ): Promise<EventoProcAceiteModel>;
  consultarId(id: number): Promise<EventoProcAceiteModel>;
  consultar(
    eventoProcAceite: EventoProcAceiteModel | any,
  ): Promise<EventoProcAceiteModel>;
  atualizar(
    id: number,
    eventoProcAceite: EventoProcAceiteModel | any,
  ): Promise<EventoProcAceiteModel>;
  deletar(id: number): Promise<EventoProcAceiteModel>;
}
