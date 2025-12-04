import Joi from "joi";
import { MedicamentoRegistradoRegistrarDtoSchema } from "./MedicamentoRegistradoRegistrar.dto";

export const CirurgiaRegistradaRegistrarDtoSchema = Joi.object({
  id: Joi.number().optional(),
  nome: Joi.string().max(256).required(),
  razao: Joi.string().max(512).required(),
  dataOperacao: Joi.string().isoDate().required(),
  medicamentosRegistrados: Joi.array().items(MedicamentoRegistradoRegistrarDtoSchema).optional(),
});