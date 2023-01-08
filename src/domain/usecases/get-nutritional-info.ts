import { NutritionalInfoWithId } from "../entities/nutritional-info";
import { IUsecase } from "./usecase";

export interface IGetNutritionalInfo
  extends IUsecase<null, NutritionalInfoWithId[]> {}
