import { CreateConnectionService } from "@services/Connections/CreateConnectionService";
import { FindConnectionBySocket } from "@services/Connections/FindConnectionBySocket";
import { FindConnectionByUserService } from "@services/Connections/FindConnectionByUserService";
import { FindConnectionsWithoutAdminService } from "@services/Connections/FindConnectionsWithoutAdminService";
import { UpdateConnectionService } from "@services/Connections/UpdateConnectionService";
import { CreateMessageService } from "@services/Messages/CreateMessageService";
import { ListUserMessagesService } from "@services/Messages/ListUserMessagesService";
import { CreateUserService } from "@services/Users/CreateUserService";
import { FindUserByEmailService } from "@services/Users/FindUserByEmailService";
import { container } from "tsyringe";

export function factory() {
  const createUserService = container.resolve(CreateUserService);

  const findUserByEmailService = container.resolve(FindUserByEmailService);

  const findConnectionByUserService = container.resolve(
    FindConnectionByUserService
  );

  const findConnectionsWithoutAdminService = container.resolve(
    FindConnectionsWithoutAdminService
  );

  const createConnectionService = container.resolve(CreateConnectionService);

  const updateConnectionService = container.resolve(UpdateConnectionService);

  const findConnectionBySocket = container.resolve(FindConnectionBySocket);

  const listMessagesByUserService = container.resolve(ListUserMessagesService);

  const createMessageService = container.resolve(CreateMessageService);

  return {
    createMessageService,
    listMessagesByUserService,
    findConnectionBySocket,
    updateConnectionService,
    createConnectionService,
    findConnectionsWithoutAdminService,
    createUserService,
    findConnectionByUserService,
    findUserByEmailService,
  };
}
