import { CreateSettingService } from "@services/Settings/CreateSettingService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateSettingsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { chat, username } = req.body;

    const createSettingService = container.resolve(CreateSettingService);

    const createdSetting = await createSettingService.execute({
      chat,
      username,
    });

    return res.status(201).json(createdSetting);
  }
}
