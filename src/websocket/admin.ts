import { io } from "src/http";

import { factory } from "./factory";

io.on("connect", async (socket) => {
  const {
    createMessageService,
    findConnectionByUserService,
    findConnectionsWithoutAdminService,
    listMessagesByUserService,
    updateConnectionService,
  } = factory();

  const allConnectionsWithoutAdmin = await findConnectionsWithoutAdminService.execute();

  io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params, cb) => {
    const { user_id } = params;

    const allMessages = await listMessagesByUserService.execute(user_id);

    cb(allMessages);
  });

  socket.on("admin_send_message", async (params) => {
    const { user_id, message } = params;

    await createMessageService.execute({
      message,
      user_id,
      admin_id: socket.id,
    });

    const { socket_id } = await findConnectionByUserService.execute(user_id);

    io.to(socket_id).emit("admin_send_to_client", {
      message,
      socket_id: socket.id,
    });
  });

  socket.on("admin_user_in_support", async (params) => {
    const { user_id } = params;

    const connection = await findConnectionByUserService.execute(user_id);

    connection.admin_id = socket.id;
    await updateConnectionService.execute(connection);

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
  });
});
