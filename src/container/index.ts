import { ISettingsRepository } from "@repositories/Settings/ISettingsRepository";
import { SettingsRepository } from "@repositories/Settings/typeorm/SettingsRepository";
import { container } from "tsyringe";

container.registerSingleton<ISettingsRepository>(
  "SettingsRepository",
  SettingsRepository
);
