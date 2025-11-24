import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from './database.module';

import { AppController } from './app.controller';
import { AppService } from '../../domain/services/app.service';

import { AlergiaRegistrada } from '../persistence/entities/AlergiaRegistrada.entity';
import { CadastroClinico } from '../persistence/entities/CadastroClinico.entity';
import { CirurgiaRegistrada } from '../persistence/entities/CirurgiaRegistrada.entity';
import { DoencaRegistrada } from '../persistence/entities/DoencaRegistrada.entity';
import { EventoProcAceite } from '../persistence/entities/EventoProcAceite.entity';
import { Funcionario } from '../persistence/entities/Funcionario.entity';
import { MedicamentoRegistrado } from '../persistence/entities/MedicamentoRegistrado.entity';
import { ProcAceite } from '../persistence/entities/ProcAceite.entity';
import { TipoSanguineo } from '../persistence/entities/TipoSanguineo.entity';
import { UsuarioAdministrativo } from '../persistence/entities/UsuarioAdministrativo.entity';

import { FuncionarioRepository } from '../persistence/repositories/Funcionario.repository';
import { UsuarioAdministrativoRepository } from '../persistence/repositories/UsuarioAdministrativo.repository';
import { CadastroClinicoRepository } from '../persistence/repositories/CadastroClinico.repository';

import { AutenticacaoController } from '../autenticacao/Autenticacao.controller';
import { ServicoAutenticacao } from '../autenticacao/Autenticacao.service';
import { AuthTokenRepository } from '../autenticacao/AuthToken/AuthToken.repository';
import { AuthToken } from '../autenticacao/AuthToken/AuthToken.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // uso em serv.
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([
      AlergiaRegistrada,
      CadastroClinico,
      CirurgiaRegistrada,
      DoencaRegistrada,
      EventoProcAceite,
      Funcionario,
      MedicamentoRegistrado,
      ProcAceite,
      TipoSanguineo,
      UsuarioAdministrativo,
      AuthToken,
    ]),
    // HttpModule
  ],
  controllers: [
    AppController,
    AutenticacaoController,
  ],
  providers: [
    AppService,
    ServicoAutenticacao,
    AuthTokenRepository,
    FuncionarioRepository,
    UsuarioAdministrativoRepository,
    CadastroClinicoRepository,
  ],
})
export class AppModule {}
