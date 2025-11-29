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

import { CadastroClinicoRepository } from '../persistence/repositories/CadastroClinico.repository';
import { UsuarioAdministrativoRepository } from "../persistence/repositories/UsuarioAdministrativo.repository";
import { FuncionarioRepository } from "../persistence/repositories/Funcionario.repository";

// Autenticação
import { ServicoAutenticacao } from '../../domain/services/Autenticacao.service';
import { AutenticacaoController } from './Autenticacao.controller';

import { AdministrativoController } from './Administrativo.controller';
import { FuncionarioController } from './Funcionario.controller';

import { ServicoAdministrativo } from 'src/domain/services/administrativo.service';
import { ServicoFuncionarios } from 'src/domain/services/funcionarios.service';

import { ConsultaCadastroClinico } from 'src/application/ConsultaCadastroClinico';
import { ConsultaUsuarioAdministrativoId } from 'src/application/ConsultaUsuarioAdministrativoId';
import { ConsultaFuncionarioId } from 'src/application/ConsultaFuncionarioId';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../autenticacao/JwtAuth.guard';
import { AutenticacaoModule } from '../autenticacao/Autenticacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AutenticacaoModule,
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
    ]),
  ],
  controllers: [
    AppController,
    AutenticacaoController,
    AdministrativoController,
    FuncionarioController,
  ],
  providers: [
    // Jwt -> autenticação global requerida
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    // Serviços
    AppService,
    ServicoAutenticacao,
    ServicoAdministrativo,
    ServicoFuncionarios,

    // Repositórios de entidades
    FuncionarioRepository,
    UsuarioAdministrativoRepository,
    CadastroClinicoRepository,

    // Objetos de aplicação (application layer)
    ConsultaCadastroClinico,
    ConsultaUsuarioAdministrativoId,
    ConsultaFuncionarioId,
  ],
})
export class AppModule {}
