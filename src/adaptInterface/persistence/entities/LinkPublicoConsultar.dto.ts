import Joi from 'joi';

export const LinkPublicoConsultarDtoSchema = Joi.object({
  chaveAlfanumerica: Joi.string().max(5).required(),
}).options({
    abortEarly: false
});
