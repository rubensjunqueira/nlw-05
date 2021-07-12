import { ICreateSettingsDTO } from "@DTOs/Settings/ICreateSettingsDTO";
import { Setting } from "@entities/Setting";

import { ISettingsRepository } from "../ISettingsRepository";

export class SettingsRepositoryInMemory implements ISettingsRepository {
  private repository: Setting[] = [];

  async create({
    chat = true,
    username,
  }: ICreateSettingsDTO): Promise<Setting> {
    const newSetting = new Setting();

    Object.assign(newSetting, {
      username,
      chat,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.repository.push(newSetting);

    return newSetting;
  }
}
