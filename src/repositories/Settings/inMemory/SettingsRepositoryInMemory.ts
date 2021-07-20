import { ICreateSettingsDTO } from "@DTOs/Settings/ICreateSettingsDTO";
import { IUpdateSettingsDTO } from "@DTOs/Settings/IUpdateSettingsDTO";
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

  async findByUsername(username: string): Promise<Setting> {
    return this.repository.find((x) => x.username === username);
  }

  async update({ chat, username, id }: IUpdateSettingsDTO): Promise<void> {
    const index = this.repository.findIndex((x) => x.id === id);

    Object.assign(this.repository[index], {
      chat,
      updated_at: new Date(),
    });
  }
}
