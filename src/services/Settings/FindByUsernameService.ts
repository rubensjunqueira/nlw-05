import { Setting } from "@entities/Setting";
import { ISettingsRepository } from "@repositories/Settings/ISettingsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindByUsernameService {
  constructor(
    @inject("SettingsRepository")
    private settingsRepository: ISettingsRepository
  ) {}

  async execute(username: string): Promise<Setting> {
    return this.settingsRepository.findByUsername(username);
  }
}
