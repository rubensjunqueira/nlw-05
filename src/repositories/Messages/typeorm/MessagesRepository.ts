import { ICreateMessageDTO } from "@DTOs/Messages/ICreateMessageDTO";
import { Message } from "@entities/Message";
import { getRepository, Repository } from "typeorm";

import { IMessagesRepository } from "../IMessagesRepository";

export class MessagesRepository implements IMessagesRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = getRepository(Message);
  }

  async create({
    admin_id,
    user_id,
    message,
  }: ICreateMessageDTO): Promise<Message> {
    const newMessage = this.repository.create({
      admin_id,
      user_id,
      message,
    });

    await this.repository.save(newMessage);

    return newMessage;
  }
}
