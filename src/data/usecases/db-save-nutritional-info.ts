import {
  NutritionalInfo,
  NutritionalInfoWithId,
} from "../../domain/entities/nutritional-info";
import { ISaveNutritionalInfo } from "../../domain/usecases/save-nutritional-info";

import { INutritionalInfoRepository } from "../repositories/nutritional-info-repository";

export class DbSaveNutritionalInfo implements ISaveNutritionalInfo {
  constructor(
    private readonly nutritionalInfoRepository: INutritionalInfoRepository
  ) {}

  async execute(data: NutritionalInfo): Promise<NutritionalInfoWithId> {
    return await this.nutritionalInfoRepository.save(data);
  }
}
