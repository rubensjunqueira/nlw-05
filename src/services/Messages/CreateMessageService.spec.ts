import { Message } from "@entities/Message";
import { User } from "@entities/User";
import { InvalidMessageError } from "@errors/InvalidMessageError";
import { UserDoesNotExistsError } from "@errors/UserDoesNotExistsError";
import { IMessagesRepository } from "@repositories/Messages/IMessagesRepository";
import { MessagesRepositoryInMemory } from "@repositories/Messages/inMemory/MessagesRepositoryInMemory";
import { UsersRepositoryInMemory } from "@repositories/Users/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@repositories/Users/IUsersRepository";

import { CreateMessageService } from "./CreateMessageService";

describe("CreateMessageService", () => {
  let messagesRepository: IMessagesRepository;
  let usersRepository: IUsersRepository;
  let service: CreateMessageService;

  beforeEach(() => {
    messagesRepository = new MessagesRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    service = new CreateMessageService(messagesRepository, usersRepository);
  });

  it("should call findById", async () => {
    expect.assertions(3);
    const { admin_id, message }: Partial<Message> = {
      admin_id: "c9885c9a-7667-5193-9b16-27f760345927",
      message: "Olá",
    };

    const data: User[] = [
      {
        id: "9f2070a2-3bda-5d1c-a2ba-4e6b7d0611e3",
        email: "maduslup@migefi.tc",
        created_at: new Date(),
      },
      {
        id: "46608173-0297-5094-abee-422b0fcf58ce",
        email: "tuso@teb.la",
        created_at: new Date(),
      },
    ];

    const spy = jest
      .spyOn(usersRepository, "findById")
      .mockImplementation(async (id) => {
        return data.find((x) => x.id === id);
      });

    await service.execute({ message, admin_id, user_id: data[0].id });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(data[0].id);
    expect(spy.mock.results[0].value).resolves.toEqual(data[0]);
  });

  it("should call findById with undefined user", async () => {
    expect.assertions(4);
    const { admin_id, message }: Partial<Message> = {
      admin_id: "c9885c9a-7667-5193-9b16-27f760345927",
      message: "Olá",
    };

    const data: User[] = [
      {
        id: "9f2070a2-3bda-5d1c-a2ba-4e6b7d0611e3",
        email: "maduslup@migefi.tc",
        created_at: new Date(),
      },
      {
        id: "46608173-0297-5094-abee-422b0fcf58ce",
        email: "tuso@teb.la",
        created_at: new Date(),
      },
    ];

    const spy = jest
      .spyOn(usersRepository, "findById")
      .mockImplementation(async (id) => {
        return data.find((x) => x.id === id);
      });

    await expect(
      service.execute({ message, admin_id, user_id: undefined })
    ).rejects.toBeInstanceOf(UserDoesNotExistsError);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(undefined);
    expect(spy.mock.results[0].value).resolves.toEqual(undefined);
  });

  it("should not be able to create a new message if user does not exists", async () => {
    const { admin_id, message }: Partial<Message> = {
      admin_id: "c9885c9a-7667-5193-9b16-27f760345927",
      message: "Olá",
    };

    await expect(
      service.execute({
        admin_id,
        message,
        user_id: undefined,
      })
    ).rejects.toBeInstanceOf(UserDoesNotExistsError);
  });

  it("should not be able to create a new message if message is invalid", async () => {
    const { admin_id, message }: Partial<Message> = {
      admin_id: "c9885c9a-7667-5193-9b16-27f760345927",
    };

    const data: User[] = [
      {
        id: "9f2070a2-3bda-5d1c-a2ba-4e6b7d0611e3",
        email: "maduslup@migefi.tc",
        created_at: new Date(),
      },
      {
        id: "46608173-0297-5094-abee-422b0fcf58ce",
        email: "tuso@teb.la",
        created_at: new Date(),
      },
    ];

    jest.spyOn(usersRepository, "findById").mockImplementation(async (id) => {
      return data.find((x) => x.id === id);
    });

    await expect(
      service.execute({
        message,
        admin_id,
        user_id: data[0].id,
      })
    ).rejects.toBeInstanceOf(InvalidMessageError);
  });

  it("should create a new message", async () => {
    const { admin_id, message }: Partial<Message> = {
      admin_id: "764a7a99-0593-5b83-a28e-75b890a0f17a",
      message: "Olá",
    };

    const data: User[] = [
      {
        id: "9f2070a2-3bda-5d1c-a2ba-4e6b7d0611e3",
        email: "maduslup@migefi.tc",
        created_at: new Date(),
      },
      {
        id: "46608173-0297-5094-abee-422b0fcf58ce",
        email: "tuso@teb.la",
        created_at: new Date(),
      },
    ];

    jest.spyOn(usersRepository, "findById").mockImplementation(async (id) => {
      return data.find((x) => x.id === id);
    });

    const createdMessage = await service.execute({
      message,
      admin_id,
      user_id: data[0].id,
    });

    expect(createdMessage).toMatchObject({
      id: expect.any(String),
      admin_id,
      user_id: data[0].id,
      created_at: expect.any(Date),
    });
  });
});
