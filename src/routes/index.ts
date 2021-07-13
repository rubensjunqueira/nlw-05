import { CreateSettingsController } from "@controllers/Settings/CreateSettingsController";
import { Router } from "express";

const routes = Router();

const createSettingController = new CreateSettingsController();

routes.post("/settings", createSettingController.handle);

export default routes;
