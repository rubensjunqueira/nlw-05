import { Connection } from "@entities/Connection";
import { IConnectionsRepository } from "@repositories/Connections/IConnectionsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindConnectionByUserService {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute(user_id: string): Promise<Connection> {
    return this.connectionsRepository.findByUser(user_id);
  }
}
