import { ISaveNutritionalInfo } from "../../../domain/usecases/save-nutritional-info";

import { DbSaveNutritionalInfo } from "../../../data/usecases/db-save-nutritional-info";

import { InMemoryNutritionalInfoRepository } from "../../../infra/in-memory/in-memory-nutritional-info-repository";

import { nutritionalInfoMock } from "../../mock/nutritional-info.mock";

describe("@data/usecases/db-save-nutritional-info", () => {
  it("should save nutritional info", async () => {
    const saveNutritionalInfo: ISaveNutritionalInfo = new DbSaveNutritionalInfo(
      new InMemoryNutritionalInfoRepository()
    );

    const nutritionalInfo = nutritionalInfoMock();

    const results = await saveNutritionalInfo.execute(nutritionalInfo);

    expect(results._id).not.toStrictEqual(undefined);
  });
});
