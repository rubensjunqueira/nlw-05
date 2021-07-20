import { ICreateConnectionDTO } from "@DTOs/Connections/ICreateConnectionDTO";
import { Connection } from "@entities/Connection";

import { IConnectionsRepository } from "../IConnectionsRepository";

export class ConnectionsRepositoryInMemory implements IConnectionsRepository {
  private repository: Connection[] = [];

  async findBySocket(socket_id: string): Promise<Connection> {
    return this.repository.find((x) => x.socket_id === socket_id);
  }

  async findWithoutAdmin(): Promise<Connection[]> {
    return this.repository.filter((x) => x.admin_id === null);
  }

  async update(data: Partial<Connection>): Promise<void> {
    const index = this.repository.findIndex((x) => x.id === data.id);

    this.repository[index].socket_id = data.socket_id;
  }

  async findByUser(user_id: string): Promise<Connection> {
    return this.repository.find((x) => x.user_id === user_id);
  }

  async create({
    admin_id,
    socket_id,
    user_id,
    id,
  }: ICreateConnectionDTO): Promise<Connection> {
    const newConnection = new Connection();

    Object.assign(newConnection, {
      user_id,
      admin_id,
      socket_id,
      created_at: new Date(),
    });

    this.repository.push(newConnection);

    return newConnection;
  }
}
