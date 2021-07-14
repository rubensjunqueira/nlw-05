import { ICreateSettingsDTO } from "@DTOs/Settings/ICreateSettingsDTO";
import { IUpdateSettingsDTO } from "@DTOs/Settings/IUpdateSettingsDTO";
import { Setting } from "@entities/Setting";

export interface ISettingsRepository {
  create({ chat, username }: ICreateSettingsDTO): Promise<Setting>;
  findByUsername(username: string): Promise<Setting>;
  update({ chat, username, id }: IUpdateSettingsDTO): Promise<void>;
}
