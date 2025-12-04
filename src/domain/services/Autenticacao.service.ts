import { Injectable, Dependencies, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { FuncionarioModel } from 'src/domain/entities/FuncionarioModel.entity';

import { UsuarioAdministrativoModel, UsuarioAdministrativoPermissaoEnumModel } from 'src/domain/entities/UsuarioAdministrativoModel.entity';
import { ServicoFuncionarios } from './funcionarios.service';
import { ServicoAdministrativo } from './administrativo.service';

@Injectable()
@Dependencies(
  ConfigService,
  JwtService,
  ServicoFuncionarios,
  ServicoAdministrativo,
)
export class ServicoAutenticacao {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly servicoFuncionarios: ServicoFuncionarios,
    private readonly servicoAdministrativo: ServicoAdministrativo,
  ) {}

  public async registrarFuncionario(funcionario: any): Promise<FuncionarioModel | undefined> {
    funcionario.senha = await bcrypt.hash(funcionario.senha, 12);
    return await this.servicoFuncionarios.registrarFuncionario(funcionario);
  }

  public async validarFuncionario(funcionario: {cpf: string, senha: string}): Promise<any> {
    const funcionarioAlvo = await this.servicoFuncionarios.consultarFuncionarioCpf(funcionario.cpf);
    if (funcionarioAlvo && await bcrypt.compare(funcionario.senha, funcionarioAlvo.senha)) {
      const { senha, ...res } = funcionarioAlvo; // (x) sem senha
      return res;
    }
  }

  public async loginFuncionario(funcionario: FuncionarioModel): Promise<any> {
    const payload = {
      userid: funcionario.id,
      userident: funcionario.cpf,
      username: funcionario.nome,
      userperm: UsuarioAdministrativoPermissaoEnumModel.VIS,
    };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async registrarUsuarioAdministrativo(usuarioAdministrativo: any): Promise<UsuarioAdministrativoModel | undefined> {
    // Cria instância de usuário admin.
    usuarioAdministrativo.senha = await bcrypt.hash(usuarioAdministrativo.senha, 12);
    return await this.servicoAdministrativo.registrarUsuarioAdministrativo(usuarioAdministrativo);
  }

  public async validarUsuarioAdministrativo(usuarioAdministrativo: {email: string, senha: string}): Promise<any> {
    const usuarioAdministrativoAlvo = await this.servicoAdministrativo.consultarUsuarioAdministrativoEmail(usuarioAdministrativo.email);
    if (usuarioAdministrativoAlvo && await bcrypt.compare(usuarioAdministrativo.senha, usuarioAdministrativoAlvo.senha)) {
      const { senha, ...res } = usuarioAdministrativoAlvo; // (x) sem senha
      return res;
    }
  }

  public async loginUsuarioAdministrativo(usuarioAdministrativo: UsuarioAdministrativoModel): Promise<any> {
    const payload = {
      userid: usuarioAdministrativo.id,
      userident: usuarioAdministrativo.email,
      username: usuarioAdministrativo.nomeDeUsuario,
      userperm: usuarioAdministrativo.permissao,
    };
    console.log("PAYLOAD =======> ", payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
