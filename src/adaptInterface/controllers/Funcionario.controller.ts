import { Controller, UseGuards, Get } from '@nestjs/common';
import { ServicoFuncionarios } from 'src/domain/services/funcionarios.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('funcionario')
export class FuncionarioController {
  constructor(
    private readonly servicoFuncionarios: ServicoFuncionarios,
  ) {}

  @Get('minhas-informacoes')
  @UseGuards(AuthGuard('jwt'))
  async getMinhasInformacoes() {
    return "<h1>Rota protegida</h1>";
  }
}
