import {
  NutritionalInfo,
  NutritionalInfoWithId,
} from "../entities/nutritional-info";
import { IUsecase } from "./usecase";

export interface ISaveNutritionalInfo
  extends IUsecase<NutritionalInfo, NutritionalInfoWithId> {}
