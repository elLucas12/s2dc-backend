import { FuncionarioModel } from './FuncionarioModel.entity';
import { CirurgiaRegistradaModel } from './CirurgiaRegistradaModel.entity';
import { DoencaRegistradaModel } from './DoencaRegistradaModel.entity';
import { MedicamentoRegistradoModel } from './MedicamentoRegistradoModel.entity';
import { TipoSanguineoModel } from './TipoSanguineoModel.entity';
import { ProcAceiteModel } from './ProcAceiteModel.entity';
import { AlergiaRegistradaModel } from './AlergiaRegistradaModel.entity';

export class CadastroClinicoModel {
  id: number;
  numeroEmergencia: string;
  criadoEm: Date;
  atualizadoEm: Date;
  funcionario: FuncionarioModel;
  procAceite: ProcAceiteModel;
  cirurgiasRegistradas: CirurgiaRegistradaModel[];
  doencasRegistradas: DoencaRegistradaModel[];
  medicamentosRegistrados: MedicamentoRegistradoModel[];
  tiposSanguineos: TipoSanguineoModel[];
  alergiasRegistradas: AlergiaRegistradaModel[];

  constructor(
    id: number,
    numeroEmergencia: string,
    criadoEm: Date,
    atualizadoEm: Date,
    funcionario: FuncionarioModel,
    procAceite: ProcAceiteModel,
    cirurgiasRegistradas: CirurgiaRegistradaModel[],
    doencasRegistradas: DoencaRegistradaModel[],
    medicamentosRegistrados: MedicamentoRegistradoModel[],
    tiposSanguineos: TipoSanguineoModel[],
    alergiasRegistradas: AlergiaRegistradaModel[],
  ) {
    this.id = id;
    this.numeroEmergencia = numeroEmergencia;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
    this.funcionario = funcionario;
    this.procAceite = procAceite;
    this.cirurgiasRegistradas = cirurgiasRegistradas;
    this.doencasRegistradas = doencasRegistradas;
    this.medicamentosRegistrados = medicamentosRegistrados;
    this.tiposSanguineos = tiposSanguineos;
    this.alergiasRegistradas = alergiasRegistradas;
  }
}
