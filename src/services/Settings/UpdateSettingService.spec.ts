import { Setting } from "@entities/Setting";
import { SettingsRepositoryInMemory } from "@repositories/Settings/inMemory/SettingsRepositoryInMemory";
import { ISettingsRepository } from "@repositories/Settings/ISettingsRepository";

import { UpdateSettingService } from "./UpdateSettingService";

describe("UpdateSettingService", () => {
  let repositoryInMemory: ISettingsRepository;
  let service: UpdateSettingService;

  beforeEach(() => {
    repositoryInMemory = new SettingsRepositoryInMemory();
    service = new UpdateSettingService(repositoryInMemory);
  });

  it("should be able to update a setting", async () => {
    const createdSetting = await repositoryInMemory.create({
      chat: true,
      username: "colomus",
    });

    await service.execute({ id: createdSetting.id, chat: false });

    const updatedSetting = await repositoryInMemory.findByUsername(
      createdSetting.username
    );

    expect(updatedSetting.chat).toBeFalsy();
  });
});
