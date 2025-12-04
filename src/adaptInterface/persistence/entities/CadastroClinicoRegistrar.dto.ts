import Joi from 'joi';

export const CadastroClinicoRegistrarDtoSchema = Joi.object({
  id: Joi.number().optional(),
  numeroEmergencia: Joi.string().required(),
  // criadoEm: Joi.string().isoDate(),
  // atualizadoEm: Joi.string().isoDate(),
}).options({
    abortEarly: false
});
