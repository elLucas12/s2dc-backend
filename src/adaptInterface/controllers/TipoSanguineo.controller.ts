import { Dependencies, Controller, Logger, Get, Bind, Param, ParseIntPipe } from '@nestjs/common';
import { TipoSanguineoRepository } from '../persistence/repositories/TipoSanguineo.repository';
import { Perms } from '../autenticacao/perms.decorator';
import { UsuarioAdministrativoPermissaoEnumModel } from 'src/domain/entities/UsuarioAdministrativoModel.entity';

@Controller('tipoSanguineo')
@Dependencies(
  TipoSanguineoRepository,
)
export class TipoSanguineoController {
  private logger = new Logger(TipoSanguineoController.name);

  constructor(
    private readonly tipoSanguineoRepository: TipoSanguineoRepository,
  ) {}

  // @Post('')
  // @Bind(Body())
  // async postTipoSanguineo(@Body() dados: Body) {
  //   this.logger.log(`[POST] Tipo Sanguineo: ${JSON.stringify(dados)}`);
  //   return await this.tipoSanguineoRepository.registrar(dados);
  // }

  @Perms(
    UsuarioAdministrativoPermissaoEnumModel.ADM,
    UsuarioAdministrativoPermissaoEnumModel.REG,
    UsuarioAdministrativoPermissaoEnumModel.VIS,
  )
  @Get(':id')
  @Bind(Param('id', ParseIntPipe))
  async getTipoSanguineo(@Param('id') id: number) {
    this.logger.log(`[GET] Tipo Sanguineo id ${id}`);
    return await this.tipoSanguineoRepository.consultarId(id);
  }
}