import Joi from "joi";
import { MedicamentoRegistradoRegistrarDtoSchema } from "./MedicamentoRegistradoRegistrar.dto";

export const AlergiaRegistradaRegistrarDtoSchema = Joi.object({
  id: Joi.number().optional(),
  nome: Joi.string().max(256).required(),
  alimentosRelacionados: Joi.string().max(512).required(),
  medicamentosRegistrados: Joi.array().items(MedicamentoRegistradoRegistrarDtoSchema).optional(),
});