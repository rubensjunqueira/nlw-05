import { ICreateConnectionDTO } from "@DTOs/Connections/ICreateConnectionDTO";
import { Connection } from "@entities/Connection";

export interface IConnectionsRepository {
  create(data: ICreateConnectionDTO): Promise<Connection>;
  findByUser(user_id: string): Promise<Connection>;
  update(data: Partial<Connection>): Promise<void>;
  findWithoutAdmin(): Promise<Connection[]>;
  findBySocket(socket_id: string): Promise<Connection>;
}
