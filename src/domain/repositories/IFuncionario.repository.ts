import { FuncionarioModel } from '../entities/FuncionarioModel.entity';

export interface IFuncionarioRepository {
  registrar(funcionario: FuncionarioModel | any): Promise<FuncionarioModel>;
  consultarId(id: number): Promise<FuncionarioModel>;
  consultarCpf(cpf: string): Promise<FuncionarioModel>;
  consultar(funcionario: FuncionarioModel | any): Promise<FuncionarioModel | FuncionarioModel[]>;
  atualizar(
    id: number,
    funcionario: FuncionarioModel | any,
  ): Promise<FuncionarioModel>;
  deletar(id: number): Promise<FuncionarioModel>;
}
