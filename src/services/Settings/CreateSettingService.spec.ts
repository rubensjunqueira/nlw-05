import { Setting } from "@entities/Setting";
import { UsernameAlreadyExistsError } from "@errors/UsernameAlreadyExistsError";
import { UsernameInvalidError } from "@errors/UsernameInvalidError";
import { SettingsRepositoryInMemory } from "@repositories/Settings/inMemory/SettingsRepositoryInMemory";
import { ISettingsRepository } from "@repositories/Settings/ISettingsRepository";

import { CreateSettingService } from "./CreateSettingService";

describe("CreateSettingService", () => {
  let settingsRepository: ISettingsRepository;
  let service: CreateSettingService;

  beforeEach(() => {
    settingsRepository = new SettingsRepositoryInMemory();
    service = new CreateSettingService(settingsRepository);
  });

  it("should not be able to create a new setting if username is undefined or empty", async () => {
    const { chat, username }: Partial<Setting> = {
      chat: true,
      username: "",
    };

    await expect(service.execute({ chat, username })).rejects.toBeInstanceOf(
      UsernameInvalidError
    );
  });

  it("should call findByUsername", async () => {
    expect.assertions(3);
    const data: Setting[] = [
      {
        id: "3022c679-e4b2-5f38-b4b9-23d893699617",
        chat: true,
        username: "Adeline Collier",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "509fcaa2-e1b4-5ef8-8154-e962ad6bb1a4",
        chat: false,
        username: "Darrell Todd",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const { chat, username }: Partial<Setting> = {
      chat: true,
      username: "Frances Fleming",
    };

    const spy = jest
      .spyOn(settingsRepository, "findByUsername")
      .mockImplementation(async (username) => {
        return data.find((x) => x.username === username);
      });

    await service.execute({ chat, username });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(username);
    expect(spy.mock.results[0].value).resolves.toEqual(undefined);
  });

  it("should call findByUsername with username already exists", async () => {
    expect.assertions(4);
    const data: Setting[] = [
      {
        id: "3022c679-e4b2-5f38-b4b9-23d893699617",
        chat: true,
        username: "Adeline Collier",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "509fcaa2-e1b4-5ef8-8154-e962ad6bb1a4",
        chat: false,
        username: "Darrell Todd",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const { chat, username }: Partial<Setting> = {
      chat: true,
      username: data[0].username,
    };

    const spy = jest
      .spyOn(settingsRepository, "findByUsername")
      .mockImplementation(async (username) => {
        return data.find((x) => x.username === username);
      });

    await expect(service.execute({ chat, username })).rejects.toBeInstanceOf(
      UsernameAlreadyExistsError
    );
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(username);
    expect(spy.mock.results[0].value).resolves.toEqual(data[0]);
  });

  it("should not be able to create a new setting if username already exits", async () => {
    const data: Setting[] = [
      {
        id: "3022c679-e4b2-5f38-b4b9-23d893699617",
        chat: true,
        username: "Adeline Collier",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "509fcaa2-e1b4-5ef8-8154-e962ad6bb1a4",
        chat: false,
        username: "Darrell Todd",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const { chat, username }: Partial<Setting> = {
      chat: true,
      username: data[0].username,
    };

    jest
      .spyOn(settingsRepository, "findByUsername")
      .mockImplementation(async (username) => {
        return data.find((x) => x.username === username);
      });

    await expect(service.execute({ chat, username })).rejects.toBeInstanceOf(
      UsernameAlreadyExistsError
    );
  });

  it("should call create", async () => {
    expect.assertions(3);
    const { chat, username }: Partial<Setting> = {
      chat: true,
      username: "Ryan Cook",
    };

    const spy = jest.spyOn(settingsRepository, "create");

    await service.execute({ chat, username });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({ chat, username });
    expect(spy.mock.results[0].value).resolves.toMatchObject({
      id: expect.any(String),
      chat,
      username,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it("should create a new setting", async () => {
    const { chat, username }: Partial<Setting> = {
      chat: true,
      username: "Ryan Cook",
    };

    const createdSetting = await service.execute({ chat, username });

    expect(createdSetting).toMatchObject({
      id: expect.any(String),
      chat,
      username,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
