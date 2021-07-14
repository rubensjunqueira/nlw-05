import { UpdateSettingService } from "@services/Settings/UpdateSettingService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateSettingController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { chat } = req.body;
    const { id } = req.params;

    const updateSettingService = container.resolve(UpdateSettingService);

    await updateSettingService.execute({ id, chat });

    return res.status(200).send();
  }
}
