import { Injectable, Dependencies } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthTokenRepository } from './AuthToken/AuthToken.repository';
import { AuthTokenModel } from './AuthToken/AuthTokenModel.entity';

import { FuncionarioRepository } from '../persistence/repositories/Funcionario.repository';
import { FuncionarioInexistenteError } from '../persistence/exceptions/FuncionarioInexistenteError';

import { UsuarioAdministrativoRepository } from '../persistence/repositories/UsuarioAdministrativo.repository';
import { UsuarioAdministrativoInexistenteError } from '../persistence/exceptions/UsuarioAdministrativoInexistenteError';

@Injectable()
@Dependencies(
  ConfigService,
  AuthTokenRepository,
  FuncionarioRepository,
  UsuarioAdministrativoRepository,
)
export class ServicoAutenticacao {
  constructor(
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly configService: ConfigService,
    private readonly funcionarioRepository: FuncionarioRepository,
    private readonly usuarioAdministrativoRepository: UsuarioAdministrativoRepository,
  ) {}

  public async autenticarFuncionario(cpf: string, senha: string): Promise<AuthTokenModel | undefined> {
    // Consulta funcionário pelo CPF e dá throw em caso de inexistência.
    const funcionarioAlvo = await this.funcionarioRepository.consultarCpf(cpf);
    if (!funcionarioAlvo) {
      throw new FuncionarioInexistenteError(`Funcionário CPF "${cpf}" não existe!`, {});
    }

    // Verifica a senha (hash) passada & retorna token de sessão.
    if (funcionarioAlvo.senha === senha) {
      const authToken = await this.authTokenRepository.gerar(
        `${cpf}:${senha}:${new Date().getTime()}`
      );
      return authToken;
    }
  }

  public async autenticarUsuarioAdministrativo(email: string, senha: string) {
    // Consulta usuário administrativo pelo email e dá throw em caso de inexistência.
    const usuarioAdministrativoAlvo = await this.usuarioAdministrativoRepository.consultarEmail(email);
    if (!usuarioAdministrativoAlvo) {
      throw new UsuarioAdministrativoInexistenteError(`Usuário Admin. Email "${email}" não existe!`, {});
    }

    // Verifica a senha (hash) passada & retorna token de sessão.
    if (usuarioAdministrativoAlvo.senha === senha) {
      const authToken = await this.authTokenRepository.gerar(
        `${email}:${senha}:${new Date().getTime()}`
      );
      return authToken;
    }
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
