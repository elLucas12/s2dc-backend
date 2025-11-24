import { CirurgiaRegistradaModel } from '../entities/CirurgiaRegistradaModel.entity';

export interface ICirurgiaRegistradaRepository {
  registrar(
    cirurgiaRegistrada: CirurgiaRegistradaModel | any,
  ): Promise<CirurgiaRegistradaModel>;
  consultarId(id: number): Promise<CirurgiaRegistradaModel>;
  consultar(
    cirurgiaRegistrada: CirurgiaRegistradaModel | any,
  ): Promise<CirurgiaRegistradaModel>;
  atualizar(
    id: number,
    cirurgiaRegistrada: CirurgiaRegistradaModel | any,
  ): Promise<CirurgiaRegistradaModel>;
  deletar(id: number): Promise<CirurgiaRegistradaModel>;
}
