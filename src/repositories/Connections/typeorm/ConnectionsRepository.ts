import { ICreateConnectionDTO } from "@DTOs/Connections/ICreateConnectionDTO";
import { Connection } from "@entities/Connection";
import { getRepository, Repository } from "typeorm";

import { IConnectionsRepository } from "../IConnectionsRepository";

export class ConnectionsRepository implements IConnectionsRepository {
  private repository: Repository<Connection>;

  constructor() {
    this.repository = getRepository(Connection);
  }

  async update(data: Partial<Connection>): Promise<void> {
    await this.repository.update(data.id, data);
  }

  async findByUser(user_id: string): Promise<Connection> {
    return this.repository.findOne({ user_id });
  }

  async create(data: ICreateConnectionDTO): Promise<Connection> {
    const newConnection = this.repository.create(data);

    await this.repository.save(newConnection);

    return newConnection;
  }
}
