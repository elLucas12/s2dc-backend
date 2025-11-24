import { Dependencies, Controller, Logger, Post, Bind, Body, NotFoundException } from '@nestjs/common';
import { ServicoAutenticacao } from './Autenticacao.service';

import { FuncionarioValidatorPipe } from '../persistence/entities/Funcionario.validator';
import { FuncionarioAutenticarDtoSchema } from '../persistence/entities/FuncionarioAutenticar.dto';
import { FuncionarioInexistenteError } from '../persistence/exceptions/FuncionarioInexistenteError';
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

  @Post('funcionario')
  @Bind(Body(new FuncionarioValidatorPipe(FuncionarioAutenticarDtoSchema)))
  public async postAutenticacaoFuncionario(dados) {
    try {
      this.logger.log(`[POST] Funcionário -> Dados: ${dados}`);
      return await this.servicoAutenticacao.autenticarFuncionario(dados.cpf, dados.senha);
    } catch(error) {
      if (error instanceof FuncionarioInexistenteError) {
        throw new NotFoundException('Funcionário não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  @Post('usuarioAdministrativo')
  @Bind(Body(new FuncionarioValidatorPipe(FuncionarioAutenticarDtoSchema)))
  public async postAutenticacaoUsuarioAdministrativo(dados) {
    try {
      this.logger.log(`[POST] Usuário Admin. -> Dados: ${dados}`);
      return await this.servicoAutenticacao.autenticarUsuarioAdministrativo(dados.email, dados.senha);
    } catch(error) {
      if (error instanceof UsuarioAdministrativoInexistenteError) {
        throw new NotFoundException('Usuário Admin. não existe no sistema!', {
          cause: error
        });
      }
      throw error;
    }
  }

  // TODO: Uso de tokens de meneira fácil nos outros serviços (isoladamente).
  // TODO: Fazer autenticação HTTP simples (talvez).
}
