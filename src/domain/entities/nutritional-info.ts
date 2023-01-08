export type NutritionalInfo = {
  name: string;
  portion: number;
  portionUnit: "g" | "ml" | string;
  calories: number;
  caloriesUnit: "kcal" | "kj";
  carbohydrates: number;
  protein: number;
  totalFat: number;
  saturatedFat?: number;
  transFat?: number;
  foodFibers?: number;
  sodium?: number;
  calcium?: number;
  totalCholesterol?: number;
};
