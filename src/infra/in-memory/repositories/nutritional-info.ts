import { INutritionalInfoRepository } from "../../../data/repositories/nutritional-info-repository";
import {
  NutritionalInfo,
  NutritionalInfoWithId,
} from "../../../domain/entities/nutritional-info";

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

  async get(): Promise<NutritionalInfoWithId[]> {
    return this.data;
  }
}
