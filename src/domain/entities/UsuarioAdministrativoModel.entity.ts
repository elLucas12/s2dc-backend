import { ProcAceiteModel } from "./ProcAceiteModel.entity";

export enum UsuarioAdministrativoPermissaoEnumModel {
  ADM = 'Administrador', // vê e escreve dados de funcionários e add admins.
  REG = 'Registro Funcionários', // vê e escreve dados de funcionários
  VIS = 'Visualização', // vê seus próprios dados (funcionário aqui)
}

export class UsuarioAdministrativoModel {
  id: number;
  permissao: UsuarioAdministrativoPermissaoEnumModel;
  nome: string;
  senha: string;
  nomeDeUsuario: string;
  email: string;
  procsAceite: ProcAceiteModel[];
  criadoEm: Date;
  atualizadoEm: Date;

  constructor(
    id: number,
    permissao: UsuarioAdministrativoPermissaoEnumModel,
    nome: string,
    senha: string,
    nomeDeUsuario: string,
    email: string,
    procsAceite: ProcAceiteModel[],
    criadoEm: Date,
    atualizadoEm: Date,
  ) {
    this.id = id;
    this.permissao = permissao;
    this.nome = nome;
    this.senha = senha;
    this.nomeDeUsuario = nomeDeUsuario;
    this.email = email;
    this.procsAceite = procsAceite;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
