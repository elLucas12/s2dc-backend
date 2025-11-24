import { CadastroClinicoModel } from '../entities/CadastroClinicoModel.entity';

export interface ICadastroClinicoRepository {
  registrar(
    cadastroClinico: CadastroClinicoModel | any,
  ): Promise<CadastroClinicoModel>;
  consultarId(id: number): Promise<CadastroClinicoModel>;
  consultar(
    cadastroClinico: CadastroClinicoModel | any,
  ): Promise<CadastroClinicoModel | CadastroClinicoModel[]>;
  atualizar(
    id: number,
    cadastroClinico: CadastroClinicoModel | any,
  ): Promise<CadastroClinicoModel>;
  deletar(id: number): Promise<CadastroClinicoModel>;
}
