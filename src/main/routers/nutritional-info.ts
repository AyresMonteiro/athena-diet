import { INutritionalInfoRepository } from "../../data/repositories/nutritional-info-repository";
import {
  NutritionalInfo,
  NutritionalInfoWithId,
} from "../../domain/entities/nutritional-info";
import { IAdapter } from "../../infra/http/adapter";
import { IRouter } from "../../infra/http/router";
import { NutritionalInfoController } from "../controllers/nutritional-info";

export class NutritionalInfoRouter implements IRouter {
  constructor(
    private readonly adapter: IAdapter,
    private readonly nutritionalInfoRepository: INutritionalInfoRepository
  ) {}

  register(): void {
    const controller = new NutritionalInfoController(
      this.nutritionalInfoRepository
    );

    this.adapter.adapt<NutritionalInfo, NutritionalInfoWithId>(
      "/nutritional-info",
      "POST",
      controller.save.bind(controller)
    );

    this.adapter.adapt<null, NutritionalInfoWithId[]>(
      "/nutritional-info",
      "GET",
      controller.get.bind(controller)
    );
  }
}
