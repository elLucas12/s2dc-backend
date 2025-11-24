import { Controller } from '@nestjs/common';
import { ServicoFuncionarios } from 'src/domain/services/funcionarios.service';
import { ServicoAutenticacao } from '../autenticacao/autenticacao.service';

@Controller('Funcionarios')
export class FuncionariosController {
  constructor(
    private readonly servicoFuncionarios: ServicoFuncionarios,
    private readonly servicoAutenticacao: ServicoAutenticacao,
  ) {}
}
