import { ICreateSettingsDTO } from "@DTOs/Settings/ICreateSettingsDTO";
import { Setting } from "@entities/Setting";

export interface ISettingsRepository {
  create({ chat, username }: ICreateSettingsDTO): Promise<Setting>;
}
