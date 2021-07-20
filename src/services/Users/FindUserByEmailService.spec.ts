import { User } from "@entities/User";
import { UsersRepositoryInMemory } from "@repositories/Users/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@repositories/Users/IUsersRepository";
import { FindUserByEmailService } from "@services/Users/FindUserByEmailService";

describe("FindUserByEmailService", () => {
  let repositoryInMemory: IUsersRepository;
  let service: FindUserByEmailService;

  beforeEach(() => {
    repositoryInMemory = new UsersRepositoryInMemory();
    service = new FindUserByEmailService(repositoryInMemory);
  });

  it("should not be able to find user if email does not exits", async () => {
    const email = "random@email.com";

    const user = await service.execute(email);

    expect(user).toBeUndefined();
  });

  it("should be able to find user", async () => {
    const data: User[] = [
      {
        id: "id",
        email: "random@email.com",
        created_at: new Date(),
      },
      {
        id: "some-id",
        email: "random1@email.com",
        created_at: new Date(),
      },
    ];

    jest
      .spyOn(repositoryInMemory, "findByEmail")
      .mockImplementation(async (email) => {
        return data.find((x) => x.email === email);
      });

    const user = await service.execute(data[0].email);

    expect(user).toEqual(data[0]);
  });
});
