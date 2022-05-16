import dotenv from "dotenv";
dotenv.config();

import { createServer } from "./server";
import db from "./db";
import knexConfig from "./knex";
import path from "path";

const port = 8000;

const server = createServer();

db.migrate.latest(knexConfig["development"].migrations).then(() => {
  server.listen(port, () => console.log(`listening port ${port}`));
});