import Joi from "joi";

export const EventoProcAceiteRegistrarDtoSchema = Joi.object({
  id: Joi.number().optional(),
  titulo: Joi.string().max(128).required(),
  descricao: Joi.string().max(512).required(),
  corpo: Joi.string().max(5120).required(),
  data: Joi.string().isoDate().required(),
});