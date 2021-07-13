import { ICreateMessageDTO } from "@DTOs/Messages/ICreateMessageDTO";
import { Message } from "@entities/Message";
import { InvalidMessageError } from "@errors/InvalidMessageError";
import { UserDoesNotExistsError } from "@errors/UserDoesNotExistsError";
import { IMessagesRepository } from "@repositories/Messages/IMessagesRepository";
import { IUsersRepository } from "@repositories/Users/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateMessageService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({
    admin_id,
    message,
    user_id,
  }: ICreateMessageDTO): Promise<Message> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) throw new UserDoesNotExistsError();

    if (!message) throw new InvalidMessageError();

    const createdMessage = await this.messagesRepository.create({
      admin_id,
      message,
      user_id,
    });

    return createdMessage;
  }
}
