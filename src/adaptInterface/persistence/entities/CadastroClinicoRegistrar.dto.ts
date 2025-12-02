import Joi from 'joi';

export const CadastroClinicoRegistrarDtoSchema = Joi.object({
  numeroEmergencia: Joi.string().required(),
  procAceite: Joi.string().length(11).required(),
  criadoEm: Joi.date().required(),
  atualizadoEm: Joi.date().required(),
}).options({
    abortEarly: false
});
