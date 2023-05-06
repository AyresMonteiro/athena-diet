import { DbGetNutritionalInfo } from "../../../data/usecases/db-get-nutritional-info";
import { IGetNutritionalInfo } from "../../../domain/usecases/get-nutritional-info";
import { InMemoryNutritionalInfoRepository } from "../../../infra/in-memory/repositories/nutritional-info";

import { nutritionalInfoMock } from "../../mock/nutritional-info.mock";

describe("@data/usecases/db-get-nutritional-info", () => {
  it("should get nutritional info", async () => {
    const nutritionalInfoRepository = new InMemoryNutritionalInfoRepository();

    const nutritionalInfo = nutritionalInfoMock();

    await nutritionalInfoRepository.save(nutritionalInfo);

    const getNutritionalInfo: IGetNutritionalInfo = new DbGetNutritionalInfo(
      nutritionalInfoRepository
    );

    const results = await getNutritionalInfo.execute(null);

    expect(results).not.toStrictEqual(undefined);
    expect(Array.isArray(results)).toStrictEqual(true);
    expect(results.length).toStrictEqual(1);
  });
});
