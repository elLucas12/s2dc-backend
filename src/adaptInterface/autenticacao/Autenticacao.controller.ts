import { Controller } from '@nestjs/common';
import { ServicoAutenticacao } from './autenticacao.service';

@Controller('Autenticacao')
export class AutenticacaoController {
  constructor(private readonly servicoAutenticacao: ServicoAutenticacao) {}
}
