import express from "express";
import supertest from "supertest";

import { InMemoryNutritionalInfoRepository } from "../../../infra/in-memory/in-memory-nutritional-info-repository";

import { ExpressAdapter } from "../../../main/adapters/express-adapter";

import { nutritionalInfoMock } from "../../mock/nutritional-info.mock";

import { NutritionalInfoRouter } from "../../../main/routes/nutritional-info-router";

describe("@main/routes/save-nutritional-info", () => {
  const app = express();
  app.use(express.json());

  const nutritionalInfoRouter = new NutritionalInfoRouter(
    new ExpressAdapter(app),
    new InMemoryNutritionalInfoRepository()
  );

  nutritionalInfoRouter.register();

  const supertester = supertest(app);

  it("should save payload", async () => {
    const nutritionalInfo = nutritionalInfoMock();

    const results = await supertester
      .post("/nutritional-info")
      .send(nutritionalInfo)
      .set("Accept", "application/json");

    expect(results.statusCode).toStrictEqual(201);
    expect(results.body).not.toStrictEqual(undefined);
    expect(results.body._id).not.toStrictEqual(undefined);
    expect(results.body.calcium).toStrictEqual(nutritionalInfo.calcium);
    expect(results.body.calories).toStrictEqual(nutritionalInfo.calories);
    expect(results.body.caloriesUnit).toStrictEqual(
      nutritionalInfo.caloriesUnit
    );
    expect(results.body.carbohydrates).toStrictEqual(
      nutritionalInfo.carbohydrates
    );
    expect(results.body.foodFibers).toStrictEqual(nutritionalInfo.foodFibers);
    expect(results.body.name).toStrictEqual(nutritionalInfo.name);
    expect(results.body.portion).toStrictEqual(nutritionalInfo.portion);
    expect(results.body.portionUnit).toStrictEqual(nutritionalInfo.portionUnit);
    expect(results.body.protein).toStrictEqual(nutritionalInfo.protein);
    expect(results.body.saturatedFat).toStrictEqual(
      nutritionalInfo.saturatedFat
    );
    expect(results.body.sodium).toStrictEqual(nutritionalInfo.sodium);
    expect(results.body.totalCholesterol).toStrictEqual(
      nutritionalInfo.totalCholesterol
    );
    expect(results.body.totalFat).toStrictEqual(nutritionalInfo.totalFat);
    expect(results.body.transFat).toStrictEqual(nutritionalInfo.transFat);
  });
});
