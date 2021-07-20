import { Connection } from "@entities/Connection";
import { IConnectionsRepository } from "@repositories/Connections/IConnectionsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateConnectionService {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute(data: Partial<Connection>): Promise<void> {
    await this.connectionsRepository.update(data);
  }
}
