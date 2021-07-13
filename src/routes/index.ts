import { CreateMessageController } from "@controllers/Messages/CreateMessageController";
import { ListUserMessagesController } from "@controllers/Messages/ListUserMessagesController";
import { CreateSettingsController } from "@controllers/Settings/CreateSettingsController";
import { CreateUserController } from "@controllers/Users/CreateUserController";
import { Router } from "express";

const routes = Router();

const createSettingController = new CreateSettingsController();
const createUserController = new CreateUserController();
const createMessageController = new CreateMessageController();
const listUserMessagesController = new ListUserMessagesController();

routes.post("/settings", createSettingController.handle);
routes.post("/users", createUserController.handle);
routes.post("/messages", createMessageController.handle);
routes.get("/messages/:user_id", listUserMessagesController.handle);

export default routes;
