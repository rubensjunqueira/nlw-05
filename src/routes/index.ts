import { CreateMessageController } from "@controllers/Messages/CreateMessageController";
import { ListUserMessagesController } from "@controllers/Messages/ListUserMessagesController";
import { CreateSettingsController } from "@controllers/Settings/CreateSettingsController";
import { FindByUsernameController } from "@controllers/Settings/FindByUsernameController";
import { UpdateSettingController } from "@controllers/Settings/UpdateSettingController";
import { CreateUserController } from "@controllers/Users/CreateUserController";
import { Router } from "express";

const routes = Router();

const createSettingController = new CreateSettingsController();
const createUserController = new CreateUserController();
const createMessageController = new CreateMessageController();
const listUserMessagesController = new ListUserMessagesController();
const findByUsernameController = new FindByUsernameController();
const updateSettingController = new UpdateSettingController();

routes.post("/settings", createSettingController.handle);
routes.get("/settings/:username", findByUsernameController.handle);
routes.put("/settings/:id", updateSettingController.handle);
routes.post("/users", createUserController.handle);
routes.post("/messages", createMessageController.handle);
routes.get("/messages/:user_id", listUserMessagesController.handle);

export default routes;
