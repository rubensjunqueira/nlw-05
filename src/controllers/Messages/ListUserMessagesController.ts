import { ListUserMessagesService } from "@services/Messages/ListUserMessagesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListUserMessagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    const listUserMessages = container.resolve(ListUserMessagesService);

    const messages = await listUserMessages.execute(user_id);

    return res.status(messages.length > 0 ? 200 : 204).json(messages);
  }
}
