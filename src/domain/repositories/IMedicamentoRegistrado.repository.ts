import { MedicamentoRegistradoModel } from '../entities/MedicamentoRegistradoModel.entity';

export interface IMedicamentoRegistradoRepository {
  registrar(
    medicamentoRegistrado: MedicamentoRegistradoModel | any,
  ): Promise<MedicamentoRegistradoModel>;
  consultarId(id: number): Promise<MedicamentoRegistradoModel>;
  consultar(
    medicamentoRegistrado: MedicamentoRegistradoModel | any,
  ): Promise<MedicamentoRegistradoModel>;
  atualizar(
    id: number,
    medicamentoRegistrado: MedicamentoRegistradoModel | any,
  ): Promise<MedicamentoRegistradoModel>;
  deletar(id: number): Promise<MedicamentoRegistradoModel>;
}
