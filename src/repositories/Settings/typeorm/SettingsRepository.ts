import { ICreateSettingsDTO } from "@DTOs/Settings/ICreateSettingsDTO";
import { IUpdateSettingsDTO } from "@DTOs/Settings/IUpdateSettingsDTO";
import { Setting } from "@entities/Setting";
import { getRepository, Repository } from "typeorm";

import { ISettingsRepository } from "../ISettingsRepository";

export class SettingsRepository implements ISettingsRepository {
  private repository: Repository<Setting>;

  constructor() {
    this.repository = getRepository(Setting);
  }

  async update({ chat, username, id }: IUpdateSettingsDTO): Promise<void> {
    await this.repository.update(id, { chat });
  }

  async findByUsername(username: string): Promise<Setting> {
    return this.repository.findOne({ username });
  }

  async create({ chat, username }: ICreateSettingsDTO): Promise<Setting> {
    const newSetting = this.repository.create({ chat, username });

    await this.repository.save(newSetting);

    return newSetting;
  }
}
