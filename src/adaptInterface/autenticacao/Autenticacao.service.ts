import { Injectable, Dependencies, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { FuncionarioRepository } from '../persistence/repositories/Funcionario.repository';
import { FuncionarioModel } from 'src/domain/entities/FuncionarioModel.entity';

import { UsuarioAdministrativoRepository } from '../persistence/repositories/UsuarioAdministrativo.repository';
import { UsuarioAdministrativoModel } from 'src/domain/entities/UsuarioAdministrativoModel.entity';

@Injectable()
@Dependencies(
  ConfigService,
  JwtService,
  FuncionarioRepository,
  UsuarioAdministrativoRepository,
)
export class ServicoAutenticacao {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly funcionarioRepository: FuncionarioRepository,
    private readonly usuarioAdministrativoRepository: UsuarioAdministrativoRepository,
  ) {}

  public async registrarFuncionario(funcionario: any): Promise<FuncionarioModel | undefined> {
    // Verifica se o funcionário já existe no banco
    const auxFuncionario = await this.funcionarioRepository.consultarCpf(funcionario.cpf);
    if (auxFuncionario) {
      throw new ConflictException('Funcionário já existe.');
    }
    // Cria instância de funcionário
    // const senhaHash = await bcrypt.hash(funcionario.senha, 12);
    return await this.funcionarioRepository.registrar(funcionario);
  }

  public async validarFuncionario(funcionario: any): Promise<any> {
    const funcionarioAlvo = await this.funcionarioRepository.consultarCpf(funcionario.cpf);
    if (funcionarioAlvo && await bcrypt.compare(funcionario.senha, funcionarioAlvo.senha)) {
      const { senha, ...res } = funcionarioAlvo; // (x) sem senha
      return res;
    }
  }

  public async loginFuncionario(funcionario: any): Promise<any> {
    const payload = {
      username: funcionario.cpf,
      sub: funcionario.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async registrarUsuarioAdministrativo(usuarioAdministrativo: any): Promise<UsuarioAdministrativoModel | undefined> {
    // Verifica se o funcionário já existe no banco
    const auxUsuarioAdministrativo = await this.usuarioAdministrativoRepository.consultarEmail(usuarioAdministrativo.email);
    if (auxUsuarioAdministrativo) {
      throw new ConflictException('Usuário Administrativo já existe.');
    }
    // Cria instância de usuário admin.
    // const senhaHash = await bcrypt.hash(usuarioAdministrativo.senha, 12);
    return await this.usuarioAdministrativoRepository.registrar(usuarioAdministrativo);
  }

  public async validarUsuarioAdministrativo(usuarioAdministrativo: any): Promise<any> {
    const usuarioAdministrativoAlvo = await this.funcionarioRepository.consultarCpf(usuarioAdministrativo.email);
    if (usuarioAdministrativoAlvo && await bcrypt.compare(usuarioAdministrativo.senha, usuarioAdministrativoAlvo.senha)) {
      const { senha, ...res } = usuarioAdministrativoAlvo; // (x) sem senha
      return res;
    }
  }

  public async loginUsuarioAdministrativo(usuarioAdministrativo: any): Promise<any> {
    const payload = {
      username: usuarioAdministrativo.email,
      sub: usuarioAdministrativo.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
