import { User } from "@entities/User";

export interface IUsersRepository {
  create(email: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
