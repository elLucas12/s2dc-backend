import { Controller, Get, Dependencies, Body, Bind, Param, ParseIntPipe, Logger, NotFoundException, Request, Post, Put, ForbiddenException } from '@nestjs/common';
import { FuncionarioInexistenteError } from '../persistence/exceptions/FuncionarioInexistenteError';
import { ConsultaFuncionarioId } from 'src/application/ConsultaFuncionarioId';
import { User } from '../decorators/user.decorator';
import { RegistraFuncionario } from 'src/application/RegistraFuncionario';
import { AtualizaFuncionario } from 'src/application/AtualizaFuncionario';
import { FuncionarioValidatorPipe } from '../persistence/entities/Funcionario.validator';
import { FuncionarioRegistrarDtoSchema } from '../persistence/entities/FuncionarioRegistrar.dto';
import { FuncionarioAtualizarDtoSchema } from '../persistence/entities/FuncionarioAtualizar.dto';
import { Perms } from '../autenticacao/perms.decorator';
import { UsuarioAdministrativoPermissaoEnumModel } from 'src/domain/entities/UsuarioAdministrativoModel.entity';
import { FuncionarioExistenteError } from '../persistence/exceptions/FuncionarioExistenteError';

@Controller('funcionario')
@Dependencies(
  ConsultaFuncionarioId,
  RegistraFuncionario,
  AtualizaFuncionario,
)
export class FuncionarioController {
  private logger: Logger = new Logger(FuncionarioController.name);

  constructor(
    private readonly consultaFuncionarioId: ConsultaFuncionarioId,
    private readonly registraFuncionario: RegistraFuncionario,
    private readonly atualizaFuncionario: AtualizaFuncionario,
  ) {}

  @Perms( 
    UsuarioAdministrativoPermissaoEnumModel.VIS,
  )
  @Get('')
  async getFuncionario(@User() user: any) {
    try {
      this.logger.log(`[GET] Funcionário id ${user.userid}`);
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

  @Perms( 
    UsuarioAdministrativoPermissaoEnumModel.ADM,
    UsuarioAdministrativoPermissaoEnumModel.REG,
  )
  @Post('')
  @Bind(Body(new FuncionarioValidatorPipe(FuncionarioRegistrarDtoSchema)))
  async postFuncionario(@User() user: any, @Body() dados: Body) {
    this.logger.log(`[POST] Funcionário id ${user.userid}`);
    return await this.registraFuncionario.run(dados);
  }

  @Perms( 
    UsuarioAdministrativoPermissaoEnumModel.VIS,
  )
  @Put('')
  @Bind(Body(new FuncionarioValidatorPipe(FuncionarioAtualizarDtoSchema)))
  async putFuncionario(@User() user: any, @Body() dados: Body) {
    try {
      this.logger.log(`[PUT] Funcionário id ${user.userid}`);
      return await this.atualizaFuncionario.run(dados);
    } catch(error) {
      if (error instanceof FuncionarioInexistenteError) {
        throw new NotFoundException('Funcionário não existe', {
          cause: error,
        });
      }
      throw error;
    }
  }

  @Perms(
    UsuarioAdministrativoPermissaoEnumModel.ADM,
    UsuarioAdministrativoPermissaoEnumModel.REG,
  )
  @Get(':id')
  @Bind(Param('id', ParseIntPipe))
  async getFuncionarioId(@Param('id') id: number) {
    try {
      this.logger.log(`[GET] Funcionário id ${id}`);
      return await this.consultaFuncionarioId.run(id);
    } catch (error) {
      if (error instanceof FuncionarioInexistenteError) {
        throw new NotFoundException('Funcionário não existe', {
          cause: error
        });
      }
      throw error;
    }
  }

  @Perms(
    UsuarioAdministrativoPermissaoEnumModel.ADM,
    UsuarioAdministrativoPermissaoEnumModel.REG,
  )
  @Post(':id')
  @Bind(
    Param('id', ParseIntPipe),
    Body(new FuncionarioValidatorPipe(FuncionarioRegistrarDtoSchema))
  )
  async postFuncionarioId(@Param('id') id: number, @Body() dados: Body) {
    try {
      this.logger.log(`[POST] Funcionário id ${id}`);
      return await this.registraFuncionario.run(dados);
    } catch (error) {
      if (error instanceof FuncionarioExistenteError) {
        throw new ForbiddenException('Funcionário já existe', {
          cause: error // TODO: ver exception correta nesta ocasião.
        });
      }
      throw error;
    }
  }

  @Perms(
    UsuarioAdministrativoPermissaoEnumModel.ADM,
    UsuarioAdministrativoPermissaoEnumModel.REG,
  )
  @Put(':id')
  @Bind(
    Param('id', ParseIntPipe),
    Body(new FuncionarioValidatorPipe(FuncionarioAtualizarDtoSchema))
  )
  async putFuncionarioId(@Param('id') id: number, @Body() dados: Body) {
    try {
      this.logger.log(`[PUT] Funcionário id ${id}`);
      return await this.atualizaFuncionario.run(dados);
    } catch(error) {
      if (error instanceof FuncionarioInexistenteError) {
        throw new NotFoundException('Funcionário não existe', {
          cause: error,
        });
      }
      throw error;
    }
  }
}
