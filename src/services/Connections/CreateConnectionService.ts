import { ICreateConnectionDTO } from "@DTOs/Connections/ICreateConnectionDTO";
import { Connection } from "@entities/Connection";
import { IConnectionsRepository } from "@repositories/Connections/IConnectionsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateConnectionService {
  constructor(
    @inject("ConnectionsRepository")
    private connectionsRepository: IConnectionsRepository
  ) {}

  async execute({
    id,
    admin_id,
    user_id,
    socket_id,
  }: ICreateConnectionDTO): Promise<Connection> {
    return this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });
  }
}
