import { Request, Response } from "express";

import { DbSaveNutritionalInfo } from "../../data/usecases/db-save-nutritional-info";
import { INutritionalInfoRepository } from "../../data/repositories/nutritional-info-repository";
import { NutritionalInfoWithId } from "../../domain/entities/nutritional-info";

export class NutritionalInfoController {
  constructor(
    private readonly nutritionalInfoRepository: INutritionalInfoRepository
  ) {}

  async save(
    req: Request,
    res: Response<NutritionalInfoWithId | { message: string }>
  ) {
    try {
      const data = req.body;

      const saveNutritionalInfo = new DbSaveNutritionalInfo(
        this.nutritionalInfoRepository
      );

      const nutritionalInfo = await saveNutritionalInfo.execute(data);

      return res.status(201).json(nutritionalInfo);
    } catch (e: unknown) {
      return res.status(500).json({ message: "system error" });
    }
  }
}
