import { User } from "@entities/User";
import { getRepository, Repository } from "typeorm";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(email: string): Promise<User> {
    const newUser = this.repository.create({ email });

    await this.repository.save(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}
