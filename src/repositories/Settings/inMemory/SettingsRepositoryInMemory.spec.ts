import { Setting } from "@entities/Setting";

import { ISettingsRepository } from "../ISettingsRepository";
import { SettingsRepositoryInMemory } from "./SettingsRepositoryInMemory";

describe("SettingsRepositoryInMemory", () => {
  let repository: ISettingsRepository;

  beforeEach(() => {
    repository = new SettingsRepositoryInMemory();
  });

  it("should create a new Setting", async () => {
    expect.assertions(5);
    const setting: Partial<Setting> = {
      chat: true,
      username: "Dominic Strickland",
    };

    const createdSetting = await repository.create({
      chat: setting.chat,
      username: setting.username,
    });

    expect(createdSetting).toHaveProperty("id", expect.any(String));
    expect(createdSetting).toHaveProperty("chat", setting.chat);
    expect(createdSetting).toHaveProperty("username", setting.username);
    expect(createdSetting).toHaveProperty("created_at", expect.any(Date));
    expect(createdSetting).toHaveProperty("updated_at", expect.any(Date));
  });

  it("should create a new setting with chat property default value true", async () => {
    const setting: Partial<Setting> = {
      username: "Dominic Strickland",
    };

    const createdSetting = await repository.create({
      chat: setting.chat,
      username: setting.username,
    });

    expect(createdSetting.chat).toBeTruthy();
  });
});
