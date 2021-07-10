import { ConnectionOptions } from "typeorm";

const options: ConnectionOptions = {
  type: "sqlite",
  database: "./src/database/database.sqlite",
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/entities/*.ts"],
};

export default options;
