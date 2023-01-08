import { NutritionalInfo, NutritionalInfoWithId } from "../../../domain/entities/nutritional-info";
import { IUsecase } from "../../../domain/usecases/usecase";

import { nutritionalInfoMock } from "../../mock/nutritional-info.mock";

interface ISaveNutritionalInfo
  extends IUsecase<NutritionalInfo, NutritionalInfoWithId> {}

interface INutritionalInfoRepository {
  save(data: NutritionalInfo): Promise<NutritionalInfoWithId>;
}

export class DbSaveNutritionalInfo implements ISaveNutritionalInfo {
  constructor(
    private readonly nutritionalInfoRepository: INutritionalInfoRepository
  ) {}

  async execute(data: NutritionalInfo): Promise<NutritionalInfoWithId> {
    return await this.nutritionalInfoRepository.save(data);
  }
}

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
