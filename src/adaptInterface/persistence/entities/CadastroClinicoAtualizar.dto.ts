import Joi from 'joi';
import { CirurgiaRegistradaRegistrarDtoSchema } from './CirurgiaRegistradaRegistrar.dto';
import { DoencaRegistradaRegistrarDtoSchema } from './DoencaRegistradaRegistrar.dto';
import { AlergiaRegistradaRegistrarDtoSchema } from './AlergiaRegistradaRegistrar.dto';
import { TipoSanguineoRegistrarDtoSchema } from './TipoSanguineoRegistrar.dto';

export const CadastroClinicoAtualizarDtoSchema = Joi.object({
  id: Joi.number().required(),
  numeroEmergencia: Joi.string().required(),
  procAceite: Joi.optional().strip(), // não deve controlar procAceite (esse valor deve ser cortado)
  cirurgiasRegistradas: Joi.array().items(CirurgiaRegistradaRegistrarDtoSchema).optional(),
  doencasRegistradas: Joi.array().items(DoencaRegistradaRegistrarDtoSchema).optional(),
  alergiasRegistradas: Joi.array().items(AlergiaRegistradaRegistrarDtoSchema).optional(),
  tipoSanguineo: TipoSanguineoRegistrarDtoSchema.optional(),
  criadoEm: Joi.string().isoDate().optional().strip(),
  atualizadoEm: Joi.string().isoDate().optional().strip(),
}).options({
    abortEarly: false
});
