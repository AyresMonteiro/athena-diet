import express from "express";
import supertest from "supertest";

import { InMemoryNutritionalInfoRepository } from "../../../infra/in-memory/in-memory-nutritional-info-repository";

import { ExpressAdapter } from "../../../main/adapters/express-adapter";

import { nutritionalInfoMock } from "../../mock/nutritional-info.mock";

import { NutritionalInfoRouter } from "../../../main/routes/nutritional-info-router";

describe("@main/routes/get-nutritional-info", () => {
  const app = express();

  const nutritionalInfoRouter = new NutritionalInfoRouter(
    new ExpressAdapter(app),
    new InMemoryNutritionalInfoRepository()
  );

  nutritionalInfoRouter.register();

  const supertester = supertest(app);

  it("should get nutritional info", async () => {
    const nutritionalInfo = nutritionalInfoMock();

    const resultsPost = await supertester
      .post("/nutritional-info")
      .send(nutritionalInfo)
      .set("Accept", "application/json");

    expect(resultsPost.statusCode).toStrictEqual(201);

    const results = await supertester
      .get("/nutritional-info")
      .send()
      .set("Accept", "application/json");

    expect(results.statusCode).toStrictEqual(200);
    expect(Array.isArray(results.body)).toStrictEqual(true);
    expect(results.body.length).toStrictEqual(1);
  });
});
