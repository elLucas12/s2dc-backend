import { CadastroClinicoModel } from "./CadastroClinicoModel.entity";

export enum FuncionarioSexoEnumModel {
  MASC = 'Masculino',
  FEM = 'Feminino',
  OUTRO = 'Outro',
}

export class FuncionarioModel {
  id: number;
  nome: string;
  cpf: string;
  ctps: string;
  sexo: FuncionarioSexoEnumModel;
  cadastrosClinicos: CadastroClinicoModel[];
  senha: string;

  constructor(
    id: number,
    nome: string,
    cpf: string,
    ctps: string,
    sexo: FuncionarioSexoEnumModel,
    cadastrosClinicos: CadastroClinicoModel[],
    senha: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.ctps = ctps;
    this.sexo = sexo;
    this.cadastrosClinicos = cadastrosClinicos;
    this.senha = senha;
  }
}
