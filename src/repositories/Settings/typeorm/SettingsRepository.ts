import { ICreateSettingsDTO } from "@DTOs/Settings/ICreateSettingsDTO";
import { Setting } from "@entities/Setting";
import { getRepository, Repository } from "typeorm";

import { ISettingsRepository } from "../ISettingsRepository";

export class SettingsRepository implements ISettingsRepository {
  private repository: Repository<Setting>;

  constructor() {
    this.repository = getRepository(Setting);
  }

  async create({ chat, username }: ICreateSettingsDTO): Promise<Setting> {
    const newSetting = this.repository.create({ chat, username });

    await this.repository.save(newSetting);

    return newSetting;
  }
}
