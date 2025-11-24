import { Injectable, Dependencies } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthTokenRepository } from './AuthToken/AuthToken.repository';
import { AuthTokenModel } from './AuthToken/AuthTokenModel.entity';

@Injectable()
@Dependencies(AuthTokenRepository, ConfigService)
export class ServicoAutenticacao {
  constructor(
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly configService: ConfigService,
  ) {}

  public async autenticarFuncionario(uname: string, passw: string) {
    // TODO: RepoORM de funcionários -> autenticação no ServicoAutenticacao.
  }

  public async autenticarUsuarioAdministrativo(uname: string, passw: string) {
    // TODO: RepoORM de usuario adm -> auth. servCad.
  }

  public async verificarValidade(hash: string): Promise<boolean> {
    const authToken = await this.authTokenRepository.consultarHash(hash);
    if (!authToken) {
      return false; // Token não existe
    }

    // Verifica a validade do token com base em sua data de criação
    // Data de Criação + VAL_TOKENS (dias) <= Data Atual
    return authToken.criadoEm.getDate() +
      this.configService.getOrThrow('VAL_TOKENS') <=
      new Date().getDate()
      ? true
      : false;
  }
}
