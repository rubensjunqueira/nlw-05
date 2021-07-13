import { ICreateMessageDTO } from "@DTOs/Messages/ICreateMessageDTO";
import { Message } from "@entities/Message";

import { IMessagesRepository } from "../IMessagesRepository";

export class MessagesRepositoryInMemory implements IMessagesRepository {
  private repository: Message[] = [];

  async create({
    admin_id,
    user_id,
    message,
  }: ICreateMessageDTO): Promise<Message> {
    const newMessage = new Message();

    Object.assign(newMessage, {
      admin_id,
      user_id,
      message,
      created_at: new Date(),
    });

    this.repository.push(newMessage);

    return newMessage;
  }
}
