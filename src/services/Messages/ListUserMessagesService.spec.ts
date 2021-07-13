import { Message } from "@entities/Message";
import { IMessagesRepository } from "@repositories/Messages/IMessagesRepository";
import { MessagesRepositoryInMemory } from "@repositories/Messages/inMemory/MessagesRepositoryInMemory";

import { ListUserMessagesService } from "./ListUserMessagesService";

describe("ListUserMessagesService", () => {
  let messagesRepository: IMessagesRepository;
  let service: ListUserMessagesService;

  beforeEach(() => {
    messagesRepository = new MessagesRepositoryInMemory();
    service = new ListUserMessagesService(messagesRepository);
  });

  it("should list all user messages", async () => {
    const messages: Partial<Message>[] = [
      {
        id: "5bd23f35-ea39-533a-94db-d27a69aeb79c",
        message: "Olá",
        created_at: new Date(),
        user_id: "ef3cb13d-e3e3-520a-9027-c8c3309babf6",
      },
      {
        id: "7ad984e5-cf83-5495-a0c6-e77a804390bf",
        message: "Olá! em que posso ajudar",
        created_at: new Date(),
        user_id: "ef3cb13d-e3e3-520a-9027-c8c3309babf6",
        admin_id: "ceb78b34-75c4-5247-baf4-79218bad0efa",
      },
      {
        id: "1a710119-33aa-50bb-a3cc-d5cfa131a50d",
        message: "Estou com um problema...",
        created_at: new Date(),
        user_id: "ef3cb13d-e3e3-520a-9027-c8c3309babf6",
      },
    ];

    jest
      .spyOn(messagesRepository, "listByUser")
      .mockImplementation(async (user_id) => {
        return messages.filter((x) => x.user_id === user_id) as Message[];
      });

    const result = await service.execute(messages[0].user_id);

    expect(result instanceof Array).toBeTruthy();
    expect(result.length).toBe(messages.length);
    expect(result).toEqual(expect.arrayContaining(messages));
  });
});
