import { NutritionalInfo } from "../../../domain/entities/nutritional-info";
import { nutritionalInfoMock } from "../../mock/nutritional-info.mock";

describe("@domain/entities/nutritional-info", () => {
  it("should set nutritional info name", () => {
    const nutritionalInfo: NutritionalInfo = nutritionalInfoMock();

    const newName = "Roasted Chicken";

    nutritionalInfo.name = newName;

    expect(nutritionalInfo.name).toStrictEqual(newName);
  });
});
