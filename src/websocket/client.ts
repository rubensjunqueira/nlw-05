import { io } from "src/http";

import { factory } from "./factory";

io.on("connect", (socket) => {
  const {
    findUserByEmailService,
    createUserService,
    createConnectionService,
    findConnectionByUserService,
    updateConnectionService,
    createMessageService,
    listMessagesByUserService,
    findConnectionBySocket,
    findConnectionsWithoutAdminService,
  } = factory();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;

    const { email, text } = params;
    // eslint-disable-next-line prefer-const
    let user_id = null;

    const userExists = await findUserByEmailService.execute(email);
    if (!userExists) {
      const user = await createUserService.execute(email);
      await createConnectionService.execute({ socket_id, user_id: user.id });

      user_id = user.id;
    } else {
      user_id = userExists.id;

      const connection = await findConnectionByUserService.execute(
        userExists.id
      );

      if (!connection) {
        await createConnectionService.execute({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;
        await updateConnectionService.execute(connection);
      }
    }
    await createMessageService.execute({
      message: text,
      user_id,
    });

    const allMessages = await listMessagesByUserService.execute(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await findConnectionsWithoutAdminService.execute();
    io.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async (params) => {
    const { message, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await findConnectionBySocket.execute(socket_id);

    const m = await createMessageService.execute({ message, user_id });

    io.to(socket_admin_id).emit("admin_receive_message", {
      message: m,
      socket_id,
    });
  });
});
