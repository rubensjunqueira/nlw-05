import { IConnectionsRepository } from "@repositories/Connections/IConnectionsRepository";
import { ConnectionsRepository } from "@repositories/Connections/typeorm/ConnectionsRepository";
import { IMessagesRepository } from "@repositories/Messages/IMessagesRepository";
import { MessagesRepository } from "@repositories/Messages/typeorm/MessagesRepository";
import { ISettingsRepository } from "@repositories/Settings/ISettingsRepository";
import { SettingsRepository } from "@repositories/Settings/typeorm/SettingsRepository";
import { IUsersRepository } from "@repositories/Users/IUsersRepository";
import { UsersRepository } from "@repositories/Users/typeorm/UsersRepository";
import { container } from "tsyringe";

container.registerSingleton<ISettingsRepository>(
  "SettingsRepository",
  SettingsRepository
);

container.registerSingleton<IConnectionsRepository>(
  "ConnectionsRepository",
  ConnectionsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IMessagesRepository>(
  "MessagesRepository",
  MessagesRepository
);
