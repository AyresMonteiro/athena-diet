import {
  NutritionalInfo,
  NutritionalInfoWithId,
} from "../../domain/entities/nutritional-info";

import { DbSaveNutritionalInfo } from "../../data/usecases/db-save-nutritional-info";
import { INutritionalInfoRepository } from "../../data/repositories/nutritional-info-repository";

import { HTTPRequest } from "../../infra/http/http-request";
import { HTTPResponse } from "../../infra/http/http-response";

export class NutritionalInfoController {
  constructor(
    private readonly nutritionalInfoRepository: INutritionalInfoRepository
  ) {}

  async save(
    req: HTTPRequest<NutritionalInfo>
  ): Promise<HTTPResponse<NutritionalInfoWithId>> {
    try {
      const data = req.payload;

      const saveNutritionalInfo = new DbSaveNutritionalInfo(
        this.nutritionalInfoRepository
      );

      const nutritionalInfo = await saveNutritionalInfo.execute(data);

      return { status: 201, data: nutritionalInfo };
    } catch (e: unknown) {
      return { status: 500, data: { message: "system error" } };
    }
  }
}
