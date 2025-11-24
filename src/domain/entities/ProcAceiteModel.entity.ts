import { UsuarioAdministrativoModel } from './UsuarioAdministrativoModel.entity';
import { CadastroClinicoModel } from './CadastroClinicoModel.entity';

export class ProcAceiteModel {
  id: number;
  dataFim: Date;
  dataInicio: Date;
  criadoEm: Date;
  atualizadoEm: Date;
  usuarioAdministrativo: UsuarioAdministrativoModel;
  cadastroClinico: CadastroClinicoModel;

  constructor(
    id: number,
    dataFim: Date,
    dataInicio: Date,
    criadoEm: Date,
    atualizadoEm: Date,
    usuarioAdministrativo: UsuarioAdministrativoModel,
    cadastroClinico: CadastroClinicoModel,
  ) {
    this.id = id;
    this.dataFim = dataFim;
    this.dataInicio = dataInicio;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
    this.usuarioAdministrativo = usuarioAdministrativo;
    this.cadastroClinico = cadastroClinico;
  }
}
