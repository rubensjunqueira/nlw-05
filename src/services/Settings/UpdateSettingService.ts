import { IUpdateSettingsDTO } from "@DTOs/Settings/IUpdateSettingsDTO";
import { ISettingsRepository } from "@repositories/Settings/ISettingsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateSettingService {
  constructor(
    @inject("SettingsRepository")
    private settingsRepository: ISettingsRepository
  ) {}

  async execute({ username, chat, id }: IUpdateSettingsDTO): Promise<void> {
    await this.settingsRepository.update({ id, chat });
  }
}
