import { AuthTokenModel } from './AuthTokenModel.entity';

export interface IAuthTokenRepository {
  gerar(sal: string): Promise<AuthTokenModel>;
  consultar(id: number): Promise<AuthTokenModel>;
  consultarHash(hash: string): Promise<AuthTokenModel>;
  deletar(id: number): Promise<AuthTokenModel>;
  atualizar(id: number, sal: string): Promise<AuthTokenModel>;
  todos(): Promise<AuthTokenModel[]>;
}
