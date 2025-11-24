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
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ServicoAutenticacao } from '../autenticacao/Autenticacao.service';
import { AutenticacaoController } from '../autenticacao/Autenticacao.controller';
import { JwtStrategy } from '../autenticacao/Jwt.strategy';

import { AdministrativoController } from './Administrativo.controller';
import { FuncionarioController } from './Funcionario.controller';
import { ServicoAdministrativo } from 'src/domain/services/administrativo.service';
import { ServicoFuncionarios } from 'src/domain/services/funcionarios.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
    ]),
    PassportModule,
    JwtModule.register({ // TODO: Usar ConfigService para JWT_SECRET (1)
      secret: process.env.JWT_SECRET || 'password',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AppController,
    AutenticacaoController,
    AdministrativoController,
    FuncionarioController,
  ],
  providers: [
    AppService,
    ServicoAutenticacao,
    ServicoAdministrativo,
    ServicoFuncionarios,
    FuncionarioRepository,
    UsuarioAdministrativoRepository,
    CadastroClinicoRepository,
    JwtStrategy,
  ],
})
export class AppModule {}
