import { INutritionalInfoRepository } from "../../../data/repositories/nutritional-info-repository";
import { DbSaveNutritionalInfo } from "../../../data/usecases/db-save-nutritional-info";
import { NutritionalInfo, NutritionalInfoWithId } from "../../../domain/entities/nutritional-info";
import { ISaveNutritionalInfo } from "../../../domain/usecases/save-nutritional-info";

import { nutritionalInfoMock } from "../../mock/nutritional-info.mock";

export class InMemoryNutritionalInfoRepository
  implements INutritionalInfoRepository
{
  constructor(
    private data: NutritionalInfoWithId[] = [],
    private lastId: number = 0
  ) {}

  async save(data: NutritionalInfo): Promise<NutritionalInfoWithId> {
    this.data.push({ ...data, _id: (++this.lastId).toString() });

    return this.data[this.lastId - 1];
  }
}

describe("@domain/usecases/save-nutritional-info", () => {
  it("should save nutritional info", async () => {
    const saveNutritionalInfo: ISaveNutritionalInfo = new DbSaveNutritionalInfo(
      new InMemoryNutritionalInfoRepository()
    );

    const nutritionalInfo = nutritionalInfoMock();

    const results = await saveNutritionalInfo.execute(nutritionalInfo);

    expect(results._id).not.toStrictEqual(undefined);
  });
});
