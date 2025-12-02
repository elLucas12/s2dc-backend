import Joi from 'joi';

export const CadastroClinicoAtualizarDtoSchema = Joi.object({
  id: Joi.number().required(),
  numeroEmergencia: Joi.string().required(),
  procAceite: Joi.string().length(11).required(),
  criadoEm: Joi.date().required(),
  atualizadoEm: Joi.date().required(),
}).options({
    abortEarly: false
});
