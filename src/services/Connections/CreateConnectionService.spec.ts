import { Connection } from "@entities/Connection";
import { IConnectionsRepository } from "@repositories/Connections/IConnectionsRepository";
import { ConnectionsRepositoryInMemory } from "@repositories/Connections/inMemory/ConnectionsRepositoryInMemory";

import { CreateConnectionService } from "./CreateConnectionService";

describe("CreateConnectionService", () => {
  let repositoryInMemory: IConnectionsRepository;
  let service: CreateConnectionService;

  beforeEach(() => {
    repositoryInMemory = new ConnectionsRepositoryInMemory();
    service = new CreateConnectionService(repositoryInMemory);
  });

  it("should be able to create a new connection by user", async () => {
    const data: Partial<Connection> = {
      user_id: "user_id",
      socket_id: "socket_id",
    };

    const createdConnection = await service.execute({
      socket_id: data.socket_id,
      user_id: data.user_id,
    });

    expect(createdConnection).toMatchObject<Partial<Connection>>({
      id: expect.any(String),
      socket_id: data.socket_id,
      user_id: data.user_id,
      admin_id: undefined,
      created_at: expect.any(Date),
    });
  });
});
