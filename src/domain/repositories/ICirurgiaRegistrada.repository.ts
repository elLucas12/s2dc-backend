import { CirurgiaRegistradaModel } from '../entities/CirurgiaRegistradaModel.entity';

export interface ICirurgiaRegistradaRepository {
  registrar(funcionario: CirurgiaRegistradaModel | any): Promise<CirurgiaRegistradaModel>;
  consultarId(id: number): Promise<CirurgiaRegistradaModel>;
  atualizar(
    id: number,
    funcionario: CirurgiaRegistradaModel | any,
  ): Promise<CirurgiaRegistradaModel>;
  deletar(id: number): Promise<CirurgiaRegistradaModel>;
}
