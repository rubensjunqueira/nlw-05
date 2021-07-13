import { CreateMessageController } from "@controllers/Messages/CreateMessageController";
import { CreateSettingsController } from "@controllers/Settings/CreateSettingsController";
import { CreateUserController } from "@controllers/Users/CreateUserController";
import { Router } from "express";

const routes = Router();

const createSettingController = new CreateSettingsController();
const createUserController = new CreateUserController();
const createMessageController = new CreateMessageController();

routes.post("/settings", createSettingController.handle);
routes.post("/users", createUserController.handle);
routes.post("/messages", createMessageController.handle);

export default routes;
