import { NutritionalInfoWithId } from "../../domain/entities/nutritional-info";
import { IGetNutritionalInfo } from "../../domain/usecases/get-nutritional-info";
import { INutritionalInfoRepository } from "../repositories/nutritional-info-repository";

export class DbGetNutritionalInfo implements IGetNutritionalInfo {
  constructor(
    private readonly nutritionalInfoRepository: INutritionalInfoRepository
  ) {}

  async execute(): Promise<NutritionalInfoWithId[]> {
    return await this.nutritionalInfoRepository.get();
  }
}
