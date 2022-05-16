import express from "express";
import "express-async-errors";
import router from "./router";
import cors from "cors";
import "reflect-metadata";

export function createServer() {
  const app = express();

  app.disable("x-powered-by");

  app.use(express.json());
  app.use(cors());

  app.use("/", router);
  app.use("/healthcheck", (_, res) => res.send({ status: "live" }));

  return app;
}