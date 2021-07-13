import { ISettingsRepository } from "@repositories/Settings/ISettingsRepository";
import { SettingsRepository } from "@repositories/Settings/typeorm/SettingsRepository";
import { IUsersRepository } from "@repositories/Users/IUsersRepository";
import { UsersRepository } from "@repositories/Users/typeorm/UsersRepository";
import { container } from "tsyringe";

container.registerSingleton<ISettingsRepository>(
  "SettingsRepository",
  SettingsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
