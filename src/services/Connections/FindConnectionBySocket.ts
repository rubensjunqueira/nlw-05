import { Connection } from "@entities/Connection";
import { IConnectionsRepository } from "@repositories/Connections/IConnectionsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindConnectionBySocket {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute(socket_id: string): Promise<Connection> {
    return this.connectionsRepository.findBySocket(socket_id);
  }
}
