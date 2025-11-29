import { Controller, Get, Dependencies, Bind, Param, ParseIntPipe, Logger, NotFoundException, Request } from '@nestjs/common';
import { ConsultaCadastroClinico } from 'src/application/ConsultaCadastroClinico';
import { FuncionarioInexistenteError } from '../persistence/exceptions/FuncionarioInexistenteError';
import { ConsultaFuncionarioId } from 'src/application/ConsultaFuncionarioId';
import { User } from '../decorators/user.decorator';

@Controller('funcionario')
@Dependencies(
  ConsultaCadastroClinico,
  ConsultaFuncionarioId,
)
export class FuncionarioController {
  private logger: Logger = new Logger();

  constructor(
    private readonly consultaCadastroClinico: ConsultaCadastroClinico,
    private readonly consultaFuncionarioId: ConsultaFuncionarioId,
  ) {}

  @Get('')
  async getFuncionario(@User() user: any) {
    try {
      return await this.consultaFuncionarioId.run(user.userid);
    } catch(error) {
      if (error instanceof FuncionarioInexistenteError) {
        throw new NotFoundException('Funcionário não existe', {
          cause: error,
        });
      }
      throw error;
    }
  }

  @Get(':id')
  @Bind(Param('id', ParseIntPipe))
  async getCadastroClinico(@Param('id') id: number) {
    try {
      return await this.consultaCadastroClinico.run(id);
    } catch (error) {
      if (error instanceof FuncionarioInexistenteError) {
        throw new NotFoundException('Funcionário não existe', {
          cause: error
        });
      }
      throw error;
    }
  }
}
