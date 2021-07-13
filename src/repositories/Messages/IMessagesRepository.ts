import { ICreateMessageDTO } from "@DTOs/Messages/ICreateMessageDTO";
import { Message } from "@entities/Message";

export interface IMessagesRepository {
  create({ admin_id, user_id, message }: ICreateMessageDTO): Promise<Message>;
}
