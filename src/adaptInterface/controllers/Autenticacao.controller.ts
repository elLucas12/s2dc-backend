import { Dependencies, Controller, Logger, Post, Bind, Body, UnauthorizedException } from '@nestjs/common';

import { ServicoAutenticacao } from '../../domain/services/Autenticacao.service';

import { FuncionarioValidatorPipe } from '../persistence/entities/Funcionario.validator';
import { FuncionarioRegistrarDtoSchema } from '../persistence/entities/FuncionarioRegistrar.dto';
import { FuncionarioLoginDtoSchema } from '../persistence/entities/FuncionarioLogin.dto';

import { UsuarioAdministrativoValidatorPipe } from '../persistence/entities/UsuarioAdministrativo.validator';
import { UsuarioAdministrativoRegistrarDtoSchema } from '../persistence/entities/UsuarioAdministrativoRegistrar.dto';
import { UsuarioAdministrativoLoginDtoSchema } from '../persistence/entities/UsuarioAdministrativoLogin.dto';
import { Public } from '../autenticacao/public.decorator';
import { FuncionarioInexistenteError } from '../persistence/exceptions/FuncionarioInexistenteError';
import { FuncionarioExistenteError } from '../persistence/exceptions/FuncionarioExistenteError';
import { UsuarioAdministrativoExistenteError } from '../persistence/exceptions/UsuarioAdministrativoExistente';
import { UsuarioAdministrativoInexistenteError } from '../persistence/exceptions/UsuarioAdministrativoInexistenteError';

@Controller('autenticacao')
@Dependencies(
  ServicoAutenticacao,
)
export class AutenticacaoController {
  private logger = new Logger(AutenticacaoController.name);

  constructor(
    private readonly servicoAutenticacao: ServicoAutenticacao
  ) {}

  /////////////////////////////
  // [ENDPOINTS] FUNCIONÁRIO //
  /////////////////////////////

  @Public()
  @Post('funcionario/registrar')
  @Bind(Body(new FuncionarioValidatorPipe(FuncionarioRegistrarDtoSchema)))
  async postFuncionarioRegistrar(@Body() dados: any) {
    try {
      this.logger.log(`[Reg. FUNCIONÁRIO] => cpf: ${dados.cpf}, senha: ${dados.senha}... raw: ${JSON.stringify(dados)}`);
      return await this.servicoAutenticacao.registrarFuncionario(dados);
    } catch(error) {
      if (error instanceof FuncionarioExistenteError) {
        throw new UnauthorizedException(`Funcionário já existe no sistema`, {
          cause: error,
        });
      }
      throw error;
    }
  }

  @Public()
  @Post('funcionario/login')
  @Bind(Body(new FuncionarioValidatorPipe(FuncionarioLoginDtoSchema)))
  async postFuncionarioLogin(@Body() dados: any) {
    try {
      this.logger.log(`[Login FUNCIONÁRIO] => cpf: ${dados.cpf}, senha: ${dados.senha}... raw: ${JSON.stringify(dados)}`);
      const funcionario = await this.servicoAutenticacao.validarFuncionario({cpf: dados.cpf, senha: dados.senha});
      if (!funcionario) {
        throw new UnauthorizedException();
      }
      return await this.servicoAutenticacao.loginFuncionario(funcionario);
    } catch (error) {
      if (error instanceof FuncionarioInexistenteError) {
        throw new UnauthorizedException(`Funcionário não existe no sistema`, {
          cause: error,
        });
      }
      throw error;
    }
  }

  ////////////////////////////////////////
  // [ENDPOINTS] USUÁRIO ADMINISTRATIVO //
  ////////////////////////////////////////

  @Public()
  @Post('usuarioAdministrativo/registrar')
  @Bind(Body(new UsuarioAdministrativoValidatorPipe(UsuarioAdministrativoRegistrarDtoSchema)))
  public async postUsuarioAdministrativoRegistrar(@Body() dados: any) {
    try {
      this.logger.log(`[Reg. ADMIN] => email: ${dados.email}, senha: ${dados.senha}... raw: ${JSON.stringify(dados)}`);
      return await this.servicoAutenticacao.registrarUsuarioAdministrativo(dados);
    } catch (error) {
      if (error instanceof UsuarioAdministrativoExistenteError) {
        throw new UnauthorizedException(`Usuário já existe no sistema`, {
          cause: error,
        });
      }
      throw error;
    }
  }

  @Public()
  @Post('usuarioAdministrativo/login')
  @Bind(Body(new UsuarioAdministrativoValidatorPipe(UsuarioAdministrativoLoginDtoSchema)))
  public async postUsuarioAdministrativoLogin(@Body() dados: any) {
    try {
      this.logger.log(`[Login ADMIN] => email: ${dados.email}, senha: ${dados.senha}... raw: ${JSON.stringify(dados)}`);
      const usuarioAdministrativo = await this.servicoAutenticacao.validarUsuarioAdministrativo({email: dados.email, senha: dados.senha});
      if (!usuarioAdministrativo) {
        throw new UnauthorizedException();
      }
      return await this.servicoAutenticacao.loginUsuarioAdministrativo(usuarioAdministrativo);
    } catch (error) {
      if (error instanceof UsuarioAdministrativoInexistenteError) {
        throw new UnauthorizedException(`Usuário não existe no sistema`, {
          cause: error,
        });
      }
      throw error;
    }
  }
}
