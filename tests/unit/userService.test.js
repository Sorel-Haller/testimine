const UserService = require("../../src/services/userService");

describe("UserService", () => {
  let mockUserRepo;
  let userService;

  beforeEach(() => {
    mockUserRepo = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    };

    userService = new UserService(mockUserRepo);
  });

  // TODO: Ülesanne — Kasutaja loomine õnnestub
  test("viskab vea kui workshop on täis", async () => {
    mockUserRepo.create.mockResolvedValue({
      id: 1,
      name: "Test",
      email: "test@test.ee",
    });
    const result = await userService.createUser("Test", "test@test.ee")
    
    expect(result).toEqual({ id:1 , name:"Test", email:"test@test.ee"})
    expect(mockUserRepo.create).toHaveBeenCalled();
    expect(mockUserRepo.create).toHaveBeenCalledWith({name:"Test", email:"test@test.ee"});
  });

  // TODO: Ülesanne — Puuduv nimi või email viskab vea
  test.todo("viskab vea kui nimi puudub");

  test.todo("viskab vea kui email puudub");
});
