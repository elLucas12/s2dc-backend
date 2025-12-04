import Joi from "joi";
import { TipoSanguineoFatorRhEnumModel, TipoSanguineoTipoEnumModel } from "src/domain/entities/TipoSanguineoModel.entity";

export const TipoSanguineoRegistrarDtoSchema = Joi.object({
  id: Joi.number().optional(),
  tipo: Joi.string().valid(...Object.values(TipoSanguineoTipoEnumModel)).required(),
  fatorRh: Joi.string().valid(...Object.values(TipoSanguineoFatorRhEnumModel)).required(),
});