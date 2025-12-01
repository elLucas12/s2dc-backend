import { MedicamentoRegistradoModel } from '../entities/MedicamentoRegistradoModel.entity';

export interface IMedicamentoRegistradoRepository {
  registrar(funcionario: MedicamentoRegistradoModel | any): Promise<MedicamentoRegistradoModel>;
  consultarId(id: number): Promise<MedicamentoRegistradoModel>;
  atualizar(
    id: number,
    funcionario: MedicamentoRegistradoModel | any,
  ): Promise<MedicamentoRegistradoModel>;
  deletar(id: number): Promise<MedicamentoRegistradoModel>;
}
