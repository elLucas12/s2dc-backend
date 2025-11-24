import { Controller } from '@nestjs/common';
import { ServicoAutenticacao } from 'src/domain/services/autenticacao.service';
import { ServicoFuncionarios } from 'src/domain/services/funcionarios.service';

@Controller('Funcionarios')
export class FuncionariosController {
  constructor(
    private readonly servicoFuncionarios: ServicoFuncionarios,
    private readonly servicoAutenticacao: ServicoAutenticacao,
  ) {}
}
