import { User } from "@entities/User";
import { IUsersRepository } from "@repositories/Users/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindUserByEmailService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute(email: string): Promise<User> {
    return this.usersRepository.findByEmail(email);
  }
}
