import {
  NutritionalInfo,
  NutritionalInfoWithId,
} from "../../domain/entities/nutritional-info";

import { INutritionalInfoRepository } from "../../data/repositories/nutritional-info-repository";

import { DbGetNutritionalInfo } from "../../data/usecases/db-get-nutritional-info";
import { DbSaveNutritionalInfo } from "../../data/usecases/db-save-nutritional-info";

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

  async get(
    _req: HTTPRequest<null>
  ): Promise<HTTPResponse<NutritionalInfoWithId[]>> {
    try {
      const getNutritionalInfo = new DbGetNutritionalInfo(
        this.nutritionalInfoRepository
      );

      const nutritionalInfo = await getNutritionalInfo.execute();

      return { status: 200, data: nutritionalInfo };
    } catch (e: unknown) {
      return { status: 500, data: { message: "system error" } };
    }
  }
}
