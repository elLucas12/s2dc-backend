import Joi from "joi";

export const MedicamentoRegistradoRegistrarDtoSchema = Joi.object({
  id: Joi.number().optional(),
  nome: Joi.string().max(256).required(),
  dosagemMg: Joi.number().required(),
});