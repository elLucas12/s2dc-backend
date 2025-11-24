export enum UsuarioAdministrativoPermissaoEnumModel {
  ADM = 'Administrador',
  REG = 'Registro Funcionários',
  VIS = 'Visualização',
}

export class UsuarioAdministrativoModel {
  id: number;
  permissao: UsuarioAdministrativoPermissaoEnumModel;
  nome: string;
  senha: string;
  nomeDeUsuario: string;
  email: string;
  criadoEm: Date;
  atualizadoEm: Date;

  constructor(
    id: number,
    permissao: UsuarioAdministrativoPermissaoEnumModel,
    nome: string,
    senha: string,
    nomeDeUsuario: string,
    email: string,
    criadoEm: Date,
    atualizadoEm: Date,
  ) {
    this.id = id;
    this.permissao = permissao;
    this.nome = nome;
    this.senha = senha;
    this.nomeDeUsuario = nomeDeUsuario;
    this.email = email;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
  }
}
