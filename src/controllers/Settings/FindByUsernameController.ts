import { FindByUsernameService } from "@services/Settings/FindByUsernameService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindByUsernameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;

    const findByUsernameService = container.resolve(FindByUsernameService);

    const setting = await findByUsernameService.execute(username);

    return res.status(200).json(setting);
  }
}
