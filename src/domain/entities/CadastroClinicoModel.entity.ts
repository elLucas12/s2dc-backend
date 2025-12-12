import { CirurgiaRegistradaModel } from './CirurgiaRegistradaModel.entity';
import { DoencaRegistradaModel } from './DoencaRegistradaModel.entity';
import { MedicamentoRegistradoModel } from './MedicamentoRegistradoModel.entity';
import { TipoSanguineoModel } from './TipoSanguineoModel.entity';
import { ProcAceiteModel } from './ProcAceiteModel.entity';
import { AlergiaRegistradaModel } from './AlergiaRegistradaModel.entity';

export class CadastroClinicoModel {
  id: number;
  numeroEmergencia: string;
  linkPublicoAtivo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
  procAceite: ProcAceiteModel;
  cirurgiasRegistradas: CirurgiaRegistradaModel[];
  doencasRegistradas: DoencaRegistradaModel[];
  medicamentosRegistrados: MedicamentoRegistradoModel[];
  tipoSanguineo: TipoSanguineoModel;
  alergiasRegistradas: AlergiaRegistradaModel[];

  constructor(
    id: number,
    numeroEmergencia: string,
    linkPublicoAtivo: boolean,
    criadoEm: Date,
    atualizadoEm: Date,
    procAceite: ProcAceiteModel,
    cirurgiasRegistradas: CirurgiaRegistradaModel[],
    doencasRegistradas: DoencaRegistradaModel[],
    medicamentosRegistrados: MedicamentoRegistradoModel[],
    tipoSanguineo: TipoSanguineoModel,
    alergiasRegistradas: AlergiaRegistradaModel[],
  ) {
    this.id = id;
    this.numeroEmergencia = numeroEmergencia;
    this.linkPublicoAtivo = linkPublicoAtivo;
    this.criadoEm = criadoEm;
    this.atualizadoEm = atualizadoEm;
    this.procAceite = procAceite;
    this.cirurgiasRegistradas = cirurgiasRegistradas;
    this.doencasRegistradas = doencasRegistradas;
    this.medicamentosRegistrados = medicamentosRegistrados;
    this.tipoSanguineo = tipoSanguineo;
    this.alergiasRegistradas = alergiasRegistradas;
  }
}
