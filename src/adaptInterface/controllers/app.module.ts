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

import { ConsultaUsuarioAdministrativoId } from 'src/application/ConsultaUsuarioAdministrativoId';
import { ConsultaFuncionarioId } from 'src/application/ConsultaFuncionarioId';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../autenticacao/JwtAuth.guard';
import { AutenticacaoModule } from '../autenticacao/Autenticacao.module';
import { RegistraFuncionario } from 'src/application/RegistraFuncionario';
import { AtualizaFuncionario } from 'src/application/AtualizaFuncionario';
import { RegistraUsuarioAdministrativo } from 'src/application/RegistraUsuarioAdministrativo';
import { AtualizaUsuarioAdministrativo } from 'src/application/AtualizaUsuarioAdministrativo';
import { CirurgiaRegistradaRepository } from '../persistence/repositories/CirurgiaRegistrada.repository';
import { CirurgiaController } from './Cirurgia.controller';
import { DoencaRegistradaRepository } from '../persistence/repositories/DoencaRegistrada.repository';
import { AlergiaRegistradaRepository } from '../persistence/repositories/AlergiaRegistrada.repository';
import { TipoSanguineoRepository } from '../persistence/repositories/TipoSanguineo.repository';
import { DoencaController } from './Doenca.controller';
import { AlergiaController } from './Alergia.controller';
import { TipoSanguineoController } from './TipoSanguineo.controller';
import { MedicamentoController } from './Medicamento.controller';
import { MedicamentoRegistradoRepository } from '../persistence/repositories/MedicamentoRegistrado.repository';
import { ProcAceiteRepository } from '../persistence/repositories/ProcAceite.repository';
import { EventoProcAceiteRepository } from '../persistence/repositories/EventoProcAceite.repository';
import { ServicoProcAceite } from 'src/domain/services/ProcAceite.service';
import { PermGuard } from '../autenticacao/Perm.guard';

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
    CirurgiaController,
    DoencaController,
    AlergiaController,
    TipoSanguineoController,
    MedicamentoController,
  ],
  providers: [
    // Jwt -> autenticação global requerida
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermGuard,
    },

    // Serviços
    AppService,
    ServicoAutenticacao,
    ServicoAdministrativo,
    ServicoFuncionarios,
    ServicoProcAceite,

    // Repositórios de entidades
    FuncionarioRepository,
    UsuarioAdministrativoRepository,
    CadastroClinicoRepository,
    CirurgiaRegistradaRepository,
    DoencaRegistradaRepository,
    AlergiaRegistradaRepository,
    TipoSanguineoRepository,
    MedicamentoRegistradoRepository,
    ProcAceiteRepository,
    EventoProcAceiteRepository,

    // Objetos de aplicação (application layer)
    ConsultaUsuarioAdministrativoId,
    RegistraUsuarioAdministrativo,
    AtualizaUsuarioAdministrativo,
    ConsultaFuncionarioId,
    RegistraFuncionario,
    AtualizaFuncionario,
  ],
})
export class AppModule {}
