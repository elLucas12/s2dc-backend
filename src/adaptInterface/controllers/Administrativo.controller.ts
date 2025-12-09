import { Controller, Dependencies, Logger, Get, Bind, Param, ParseIntPipe, NotFoundException, Post, Body, Put, ConflictException } from '@nestjs/common';
import { ConsultaUsuarioAdministrativoId } from 'src/application/ConsultaUsuarioAdministrativoId';
import { User } from '../decorators/user.decorator';
import { RegistraUsuarioAdministrativo } from 'src/application/RegistraUsuarioAdministrativo';
import { AtualizaUsuarioAdministrativo } from 'src/application/AtualizaUsuarioAdministrativo';
import { UsuarioAdministrativoInexistenteError } from '../persistence/exceptions/UsuarioAdministrativoInexistenteError';
import { UsuarioAdministrativoValidatorPipe } from '../persistence/entities/UsuarioAdministrativo.validator';
import { UsuarioAdministrativoRegistrarDtoSchema } from '../persistence/entities/UsuarioAdministrativoRegistrar.dto';
import { UsuarioAdministrativoExistenteError } from '../persistence/exceptions/UsuarioAdministrativoExistente';
import { UsuarioAdministrativoAtualizarDtoSchema } from '../persistence/entities/UsuarioAdministrativoAtualizar.dto';
import { Perms } from '../autenticacao/perms.decorator';
import { UsuarioAdministrativoPermissaoEnumModel } from 'src/domain/entities/UsuarioAdministrativoModel.entity';
import { AprovaProcAceite } from 'src/application/AprovaProcAceite';
import { CancelaProcAceite } from 'src/application/CancelaProcAceite';
import { ProcAceiteInexistenteError } from '../persistence/exceptions/ProcAceiteInexistenteError';

@Controller('usuarioAdministrativo')
@Dependencies(
  ConsultaUsuarioAdministrativoId,
  RegistraUsuarioAdministrativo,
  AtualizaUsuarioAdministrativo,
  AprovaProcAceite,
  CancelaProcAceite,
)
export class AdministrativoController {
  private logger: Logger = new Logger(AdministrativoController.name);

  constructor(
    private readonly consultaUsuarioAdministrativoId: ConsultaUsuarioAdministrativoId,
    private readonly registraUsuarioAdministrativo: RegistraUsuarioAdministrativo,
    private readonly atualizaUsuarioAdministrativo: AtualizaUsuarioAdministrativo,
    private readonly aprovaProcAceite: AprovaProcAceite,
    private readonly cancelaProcAceite: CancelaProcAceite,
  ) {}

  @Perms(
    UsuarioAdministrativoPermissaoEnumModel.ADM,
    UsuarioAdministrativoPermissaoEnumModel.REG,
  )
  @Get('')
  async getUsuarioAdministrativo(@User() user: any) {
    try {
      this.logger.log(`[GET] Usuário Admin. id ${user.userid}`);
      return await this.consultaUsuarioAdministrativoId.run(user.userid);
    } catch(error) {
      if (error instanceof UsuarioAdministrativoInexistenteError) {
        throw new NotFoundException('Usuário Admin. não existe', {
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
  @Bind(Body(new UsuarioAdministrativoValidatorPipe(UsuarioAdministrativoRegistrarDtoSchema)))
  async postUsuarioAdministrativo(@User() user: any, @Body() dados: Body) {
    try {
      this.logger.log(`[POST] Usuário Administrativo id ${user.userid}`);
      return await this.registraUsuarioAdministrativo.run(dados);
    } catch (error) {
      if (error instanceof UsuarioAdministrativoExistenteError) {
        throw new ConflictException(`Usuário Admin. já existe`, {
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
  @Put('')
  @Bind(Body(new UsuarioAdministrativoValidatorPipe(UsuarioAdministrativoAtualizarDtoSchema)))
  async putUsuarioAdministrativo(@User() user: any, @Body() dados: Body) {
    try {
      this.logger.log(`[PUT] Usuário Admin. id ${user.userid}`);
      return await this.atualizaUsuarioAdministrativo.run(dados);
    } catch(error) {
      if (error instanceof UsuarioAdministrativoInexistenteError) {
        throw new NotFoundException('Usuário Admin. não existe', {
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
  async getUsuarioAdministrativoId(@Param('id') id: number) {
    try {
      this.logger.log(`[GET] Usuário Admin. id ${id}`);
      return await this.consultaUsuarioAdministrativoId.run(id);
    } catch (error) {
      if (error instanceof UsuarioAdministrativoInexistenteError) {
        throw new NotFoundException('Usuário Admin. não existe', {
          cause: error,
        });
      }
      throw error;
    }
  }

  @Perms(
    UsuarioAdministrativoPermissaoEnumModel.ADM,
  )
  @Post(':id')
  @Bind(
    Param('id', ParseIntPipe),
    Body(new UsuarioAdministrativoValidatorPipe(UsuarioAdministrativoRegistrarDtoSchema))
  )
  async postUsuarioAdministrativoId(@Param('id') id: number, @Body() dados: Body) {
    try {
      this.logger.log(`[POST] Usuário Admin. id ${id}`);
      return await this.registraUsuarioAdministrativo.run(dados);
    } catch (error) {
      if (error instanceof UsuarioAdministrativoExistenteError) {
        throw new ConflictException('Usuário Admin. já existe', {
          cause: error,
        });
      }
      throw error;
    }
  }

  @Perms(
    UsuarioAdministrativoPermissaoEnumModel.ADM,
  )
  @Put(':id')
  @Bind(
    Param('id', ParseIntPipe),
    Body(new UsuarioAdministrativoValidatorPipe(UsuarioAdministrativoAtualizarDtoSchema))
  )
  async putUsuarioAdministrativoId(@Param('id') id: number, @Body() dados: Body) {
    try {
      this.logger.log(`[PUT] Funcionário id ${id}`);
      return await this.atualizaUsuarioAdministrativo.run(dados);
    } catch(error) {
      if (error instanceof UsuarioAdministrativoInexistenteError) {
        throw new NotFoundException('Usuário Admin. não existe', {
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
  @Get('procAceite/:id/cancelar')
  @Bind(Param('id', ParseIntPipe))
  async getCancelarProcAceite(@Param('id') id: number) {
    try {
      this.logger.log(`[GET] CANCELAR procAceite ID ${id}`);
      return await this.cancelaProcAceite.run(id);
    } catch (error) {
      if (error instanceof ProcAceiteInexistenteError) {
        throw new NotFoundException('Processo não existe', {
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
  @Get('procAceite/:id/aprovar')
  @Bind(Param('id', ParseIntPipe))
  async getAprovarProcAceite(@Param('id') id: number) {
    try {
      this.logger.log(`[GET] APROVAR procAceite ID ${id}`);
      return await this.aprovaProcAceite.run(id);
    } catch (error) {
      if (error instanceof ProcAceiteInexistenteError) {
        throw new NotFoundException('Processo não existe', {
          cause: error,
        });
      }
      throw error;
    }
  }
}
