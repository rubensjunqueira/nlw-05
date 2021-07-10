import { ConnectionOptions } from "typeorm";

const options: ConnectionOptions = {
  type: "sqlite",
  database: "./src/database/database.sqlite",
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  migrations: ["./src/database/migrations/*.ts"],
};

export default options;
