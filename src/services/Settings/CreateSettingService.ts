import { ICreateSettingsDTO } from "@DTOs/Settings/ICreateSettingsDTO";
import { Setting } from "@entities/Setting";
import { UsernameAlreadyExistsError } from "@errors/UsernameAlreadyExistsError";
import { UsernameInvalidError } from "@errors/UsernameInvalidError";
import { ISettingsRepository } from "@repositories/Settings/ISettingsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateSettingService {
  constructor(
    @inject("SettingsRepository")
    private settingsRepository: ISettingsRepository
  ) {}

  async execute({
    chat = true,
    username,
  }: ICreateSettingsDTO): Promise<Setting> {
    if (!username) throw new UsernameInvalidError();

    const usernameAlreadyExists = await this.settingsRepository.findByUsername(
      username
    );

    if (usernameAlreadyExists)
      throw new UsernameAlreadyExistsError(`${username} already exists!`);

    const newSetting = await this.settingsRepository.create({ chat, username });

    return newSetting;
  }
}
