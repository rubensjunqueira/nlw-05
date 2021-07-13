import { User } from "@entities/User";
import { InvalidEmailError } from "@errors/InvalidEmailError";
import { UserEmailAlreadyExistsError } from "@errors/UserEmailAlreadyExistsError";
import { IUsersRepository } from "@repositories/Users/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute(email: string): Promise<User> {
    if (!email) throw new InvalidEmailError();

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists)
      throw new UserEmailAlreadyExistsError(`${email} already exists!`);

    const newUser = await this.usersRepository.create(email);

    return newUser;
  }
}
