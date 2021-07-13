import { Message } from "@entities/Message";
import { IMessagesRepository } from "@repositories/Messages/IMessagesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListUserMessagesService {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}

  async execute(user_id: string): Promise<Message[]> {
    return this.messagesRepository.listByUser(user_id);
  }
}
