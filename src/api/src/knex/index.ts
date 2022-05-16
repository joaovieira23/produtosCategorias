import knex from "knex";
import path from "path";


const knexConfig: Record<
  string,
  Exclude<Parameters<typeof knex>[0], string>
> = {
  test: {
    client: "sqlite3",
    connection: ":memory",
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "/migrations"),
      tableName: "migrations",
    },
    seeds: {
      directory: path.join(__dirname, "/seeds"),
    },
  },

  development: {
    client: "sqlite3",
    connection: ":memory",
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "/migrations"),
      tableName: "migrations",
    },
    pool: {
      max: 100000000,
      min: 0,
    },
    seeds: {
      directory: path.join(__dirname, "/seeds"),
    },
  },
};

export default knexConfig;
