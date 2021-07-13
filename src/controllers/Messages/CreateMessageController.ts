import { CreateMessageService } from "@services/Messages/CreateMessageService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateMessageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { admin_id, user_id, message } = req.body;

    const createMessageService = container.resolve(CreateMessageService);

    const createdMessage = await createMessageService.execute({
      admin_id,
      message,
      user_id,
    });

    return res.status(201).json(createdMessage);
  }
}
