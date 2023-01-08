import { NutritionalInfo, NutritionalInfoWithId } from "../../domain/entities/nutritional-info";

export interface INutritionalInfoRepository {
  save(data: NutritionalInfo): Promise<NutritionalInfoWithId>;
  get(): Promise<NutritionalInfoWithId[]>;
}
