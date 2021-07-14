import { ConnectionsRepository } from "@repositories/Connections/typeorm/ConnectionsRepository";
import { UsersRepository } from "@repositories/Users/typeorm/UsersRepository";
import { CreateMessageService } from "@services/Messages/CreateMessageService";
import { io } from "src/http";
import { container } from "tsyringe";

interface IParams {
  text: string;
  email: string;
}

io.on("connect", (socket) => {
  const connectionsRepository = new ConnectionsRepository();
  const usersRepository = new UsersRepository();
  const createMessageService = container.resolve(CreateMessageService);

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;

    const { email, text } = params;
    // eslint-disable-next-line prefer-const
    let user_id = null;

    const userExists = await usersRepository.findByEmail(email);
    if (!userExists) {
      const user = await usersRepository.create(email);
      await connectionsRepository.create({ socket_id, user_id: user.id });

      user_id = user.id;
    } else {
      user_id = userExists.id;
      const connection = await connectionsRepository.findByUser(userExists.id);
      if (!connection) {
        await connectionsRepository.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionsRepository.update(connection);
      }
    }
    await createMessageService.execute({
      message: text,
      user_id,
    });
  });
});
