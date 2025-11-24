import { Dependencies, Controller, Post, Bind, Body } from '@nestjs/common';
import { ServicoAutenticacao } from './Autenticacao.service';

import { FuncionarioValidatorPipe } from '../persistence/entities/Funcionario.validator';
import { FuncionarioAutenticarDtoSchema } from '../persistence/entities/FuncionarioAutenticar.dto';

@Controller('Autenticacao')
@Dependencies(
  ServicoAutenticacao,
)
export class AutenticacaoController {
  constructor(
    private readonly servicoAutenticacao: ServicoAutenticacao
  ) {}

  @Post('autenticacao/funcionario')
  @Bind(Body(new FuncionarioValidatorPipe(FuncionarioAutenticarDtoSchema)))
  public async postAutenticacaoFuncionario(dados) {
    return await this.servicoAutenticacao.autenticarFuncionario(dados.cpf, dados.senha);
  }

  @Post('autenticacao/usuarioAdministrativo')
  @Bind(Body(new FuncionarioValidatorPipe(FuncionarioAutenticarDtoSchema)))
  public async postAutenticacaoUsuarioAdministrativo(dados) {
    return await this.servicoAutenticacao.autenticarUsuarioAdministrativo(dados.email, dados.senha);
  }

  // TODO: Uso de tokens de meneira fácil nos outros serviços (isoladamente).
}
