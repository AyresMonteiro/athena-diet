import { faker } from "@faker-js/faker";

import { NutritionalInfo } from "../../domain/entities/nutritional-info";

export function nutritionalInfoMock(): NutritionalInfo {
  return {
    name: faker.animal.bird(),
    portion: Number(faker.random.numeric()),
    portionUnit: faker.helpers.arrayElement(["g", "ml"]),
    calories: Number(faker.random.numeric()),
    caloriesUnit: faker.helpers.arrayElement(["kcal", "kj"]),
    carbohydrates: Number(faker.random.numeric()),
    protein: Number(faker.random.numeric()),
    totalFat: Number(faker.random.numeric()),
    saturatedFat: Number(faker.random.numeric()),
    transFat: Number(faker.random.numeric()),
    foodFibers: Number(faker.random.numeric()),
    sodium: Number(faker.random.numeric()),
    calcium: Number(faker.random.numeric()),
    totalCholesterol: Number(faker.random.numeric()),
  };
}
