import Joi from 'joi';
import { CirurgiaRegistradaRegistrarDtoSchema } from './CirurgiaRegistradaRegistrar.dto';
import { DoencaRegistradaRegistrarDtoSchema } from './DoencaRegistradaRegistrar.dto';
import { AlergiaRegistradaRegistrarDtoSchema } from './AlergiaRegistradaRegistrar.dto';
import { TipoSanguineoRegistrarDtoSchema } from './TipoSanguineoRegistrar.dto';
import { MedicamentoRegistradoRegistrarDtoSchema } from './MedicamentoRegistradoRegistrar.dto';

export const CadastroClinicoRegistrarDtoSchema = Joi.object({
  id: Joi.number().optional(),
  numeroEmergencia: Joi.string().required(),
  procAceite: Joi.optional().strip(), // não deve controlar procAceite (esse valor deve ser cortado)
  cirurgiasRegistradas: Joi.array().items(CirurgiaRegistradaRegistrarDtoSchema).optional(),
  doencasRegistradas: Joi.array().items(DoencaRegistradaRegistrarDtoSchema).optional(),
  alergiasRegistradas: Joi.array().items(AlergiaRegistradaRegistrarDtoSchema).optional(),
  tipoSanguineo: TipoSanguineoRegistrarDtoSchema.optional(),
  medicamentosRegistrados: Joi.array().items(MedicamentoRegistradoRegistrarDtoSchema).optional(),
  criadoEm: Joi.string().isoDate().optional().strip(),
  atualizadoEm: Joi.string().isoDate().optional().strip(),
}).options({
    abortEarly: false
});
