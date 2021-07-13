import { User } from "@entities/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private repository: User[] = [];

  async create(email: string): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, {
      email,
      created_at: new Date(),
    });

    this.repository.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.find((x) => x.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.repository.find((x) => x.id === id);
  }
}
