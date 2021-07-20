import { Setting } from "@entities/Setting";
import { SettingsRepositoryInMemory } from "@repositories/Settings/inMemory/SettingsRepositoryInMemory";
import { ISettingsRepository } from "@repositories/Settings/ISettingsRepository";

import { FindByUsernameService } from "./FindByUsernameService";

describe("FindByUsernameService", () => {
  let repositoryInMemory: ISettingsRepository;
  let service: FindByUsernameService;

  beforeEach(() => {
    repositoryInMemory = new SettingsRepositoryInMemory();
    service = new FindByUsernameService(repositoryInMemory);
  });

  it("should not be able to find if user does not exits", async () => {
    const username = "colomus";

    const setting = await service.execute(username);

    expect(setting).toBeUndefined();
  });

  it("should be able to find a setting by username", async () => {
    const data: Setting[] = [
      {
        id: "id1",
        chat: false,
        username: "colomus",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "id2",
        chat: true,
        username: "colomus1010",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    jest
      .spyOn(repositoryInMemory, "findByUsername")
      .mockImplementation(async (username) => {
        return data.find((x) => x.username === username);
      });

    const setting = await service.execute(data[0].username);

    expect(setting).toEqual(data[0]);
  });
});
