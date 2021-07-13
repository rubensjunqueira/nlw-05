import { User } from "@entities/User";
import { InvalidEmailError } from "@errors/InvalidEmailError";
import { UserEmailAlreadyExistsError } from "@errors/UserEmailAlreadyExistsError";
import { UsersRepositoryInMemory } from "@repositories/Users/inMemory/UsersRepositoryInMemory";
import { IUsersRepository } from "@repositories/Users/IUsersRepository";

import { CreateUserService } from "./CreateUserService";

describe("CreateUserService", () => {
  let usersRepository: IUsersRepository;
  let service: CreateUserService;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    service = new CreateUserService(usersRepository);
  });

  it("should not be able to create a new user if email is invalid", async () => {
    await expect(service.execute(undefined)).rejects.toBeInstanceOf(
      InvalidEmailError
    );
  });

  it("should call findByEmail", async () => {
    expect.assertions(3);
    const data: User[] = [
      {
        id: "158bbf97-fc3a-5035-9b1f-afdf63b0ed4d",
        email: "siv@gohickoz.ye",
        created_at: new Date(),
      },
      {
        id: "a4dae073-857b-5cba-84b0-2501cc487052",
        email: "eliduol@tekoj.it",
        created_at: new Date(),
      },
    ];

    const newEmail = "kuzti@hawucim.io";

    const spy = jest
      .spyOn(usersRepository, "findByEmail")
      .mockImplementation(async (email) => {
        return data.find((x) => x.email === email);
      });

    await service.execute(newEmail);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newEmail);
    expect(spy.mock.results[0].value).resolves.toBeUndefined();
  });

  it("should call findByEmail with userAlreadyExists", async () => {
    expect.assertions(4);
    const data: User[] = [
      {
        id: "158bbf97-fc3a-5035-9b1f-afdf63b0ed4d",
        email: "siv@gohickoz.ye",
        created_at: new Date(),
      },
      {
        id: "a4dae073-857b-5cba-84b0-2501cc487052",
        email: "eliduol@tekoj.it",
        created_at: new Date(),
      },
    ];

    const newEmail = data[0].email;

    const spy = jest
      .spyOn(usersRepository, "findByEmail")
      .mockImplementation(async (email) => {
        return data.find((x) => x.email === email);
      });

    await expect(service.execute(newEmail)).rejects.toBeInstanceOf(
      UserEmailAlreadyExistsError
    );
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newEmail);
    expect(spy.mock.results[0].value).resolves.toEqual(data[0]);
  });

  it("should not be able to create a new user if user already exists", async () => {
    const data: User[] = [
      {
        id: "158bbf97-fc3a-5035-9b1f-afdf63b0ed4d",
        email: "siv@gohickoz.ye",
        created_at: new Date(),
      },
      {
        id: "a4dae073-857b-5cba-84b0-2501cc487052",
        email: "eliduol@tekoj.it",
        created_at: new Date(),
      },
    ];

    const { email } = data[0];

    jest
      .spyOn(usersRepository, "findByEmail")
      .mockImplementation(async (email) => {
        return data.find((x) => x.email === email);
      });

    await expect(service.execute(email)).rejects.toBeInstanceOf(
      UserEmailAlreadyExistsError
    );
  });

  it("should call create", async () => {
    expect.assertions(3);
    const email = "taja@saniwkad.fr";

    const spy = jest.spyOn(usersRepository, "create");

    await service.execute(email);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(email);
    expect(spy.mock.results[0].value).resolves.toMatchObject({
      id: expect.any(String),
      email,
      created_at: expect.any(Date),
    });
  });

  it("should create a new user", async () => {
    const email = "ciis@sijijez.cy";

    const createdUser = await service.execute(email);

    expect(createdUser).toMatchObject({
      id: expect.any(String),
      email,
      created_at: expect.any(Date),
    });
  });
});
