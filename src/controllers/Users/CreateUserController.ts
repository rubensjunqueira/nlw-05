import { CreateUserService } from "@services/Users/CreateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const createdUser = await createUserService.execute(email);

    return res.status(201).json(createdUser);
  }
}
