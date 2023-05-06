import express from "express";
import { InMemoryNutritionalInfoRepository } from "../infra/in-memory/repositories/nutritional-info";
import { ExpressAdapter } from "./adapters/express";
import { NutritionalInfoRouter } from "./routers/nutritional-info";

const athena = express();
athena.use(express.json());

const defaultAdapter = new ExpressAdapter(athena);

const defaultNutritionalInfoRepository =
  new InMemoryNutritionalInfoRepository();

const routers = [
  new NutritionalInfoRouter(defaultAdapter, defaultNutritionalInfoRepository),
];

for (const router of routers) {
  router.register();
}

athena.listen(process.env.PORT ?? 3333);

console.log("ATHENA is listening " + (process.env.PORT ?? 3333));
