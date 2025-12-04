import Joi from "joi";
import { MedicamentoRegistradoRegistrarDtoSchema } from "./MedicamentoRegistradoRegistrar.dto";

export const DoencaRegistradaRegistrarDtoSchema = Joi.object({
  id: Joi.number().optional(),
  nome: Joi.string().max(256).required(),
  cid: Joi.string().max(64).required(),
  dataConhecimento: Joi.string().isoDate().required(),
  medicamentosRegistrados: Joi.array().items(MedicamentoRegistradoRegistrarDtoSchema).optional(),
});