import { CreateSettingsController } from "@controllers/Settings/CreateSettingsController";
import { CreateUserController } from "@controllers/Users/CreateUserController";
import { Router } from "express";

const routes = Router();

const createSettingController = new CreateSettingsController();
const createUserController = new CreateUserController();

routes.post("/settings", createSettingController.handle);
routes.post("/users", createUserController.handle);

export default routes;
