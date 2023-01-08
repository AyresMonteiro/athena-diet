import express from "express";
import supertest from "supertest";

import { InMemoryNutritionalInfoRepository } from "../../../infra/in-memory/in-memory-nutritional-info-repository";

import { NutritionalInfoController } from "../../../main/controllers/nutritional-info-controller";

import { nutritionalInfoMock } from "../../mock/nutritional-info.mock";

const app = express();

const controller = new NutritionalInfoController(
  new InMemoryNutritionalInfoRepository()
);

app.post("/nutritional-info", controller.save.bind(controller));

const supertester = supertest(app);

describe("@main/routes/save-nutritional-info", () => {
  it("should save payload", async () => {
    const nutritionalInfo = nutritionalInfoMock();

    const results = await supertester
      .post("/nutritional-info")
      .send(nutritionalInfo)
      .set("Accept", "application/json");

    expect(results.statusCode).toStrictEqual(201);
    expect(results.body).not.toStrictEqual(undefined);
    expect(results.body._id).not.toStrictEqual(undefined);
    expect(results.body.calcium).not.toStrictEqual(nutritionalInfo.calcium);
    expect(results.body.calories).not.toStrictEqual(nutritionalInfo.calories);
    expect(results.body.caloriesUnit).not.toStrictEqual(
      nutritionalInfo.caloriesUnit
    );
    expect(results.body.carbohydrates).not.toStrictEqual(
      nutritionalInfo.carbohydrates
    );
    expect(results.body.foodFibers).not.toStrictEqual(
      nutritionalInfo.foodFibers
    );
    expect(results.body.name).not.toStrictEqual(nutritionalInfo.name);
    expect(results.body.portion).not.toStrictEqual(nutritionalInfo.portion);
    expect(results.body.portionUnit).not.toStrictEqual(
      nutritionalInfo.portionUnit
    );
    expect(results.body.protein).not.toStrictEqual(nutritionalInfo.protein);
    expect(results.body.saturatedFat).not.toStrictEqual(
      nutritionalInfo.saturatedFat
    );
    expect(results.body.sodium).not.toStrictEqual(nutritionalInfo.sodium);
    expect(results.body.totalCholesterol).not.toStrictEqual(
      nutritionalInfo.totalCholesterol
    );
    expect(results.body.totalFat).not.toStrictEqual(nutritionalInfo.totalFat);
    expect(results.body.transFat).not.toStrictEqual(nutritionalInfo.transFat);
  });
});
