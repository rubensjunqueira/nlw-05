import { Connection } from "@entities/Connection";
import { IConnectionsRepository } from "@repositories/Connections/IConnectionsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindConnectionsWithoutAdminService {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute(): Promise<Connection[]> {
    return this.connectionsRepository.findWithoutAdmin();
  }
}
