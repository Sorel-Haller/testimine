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
  test("kasutaja loomine õnnestub", async () => {
    mockUserRepo.create.mockResolvedValue({
      id: 1,
      name: "Test",
      email: "test@test.ee",
    });
    mockUserRepo.findByEmail.mockResolvedValue(null);


    const result = await userService.createUser("Test", "test@test.ee")
    
    expect(result).toEqual({ id:1 , name:"Test", email:"test@test.ee"})
    expect(mockUserRepo.create).toHaveBeenCalled();
    expect(mockUserRepo.create).toHaveBeenCalledWith({name:"Test", email:"test@test.ee"});
  });

  // TODO: Ülesanne — Puuduv nimi või email viskab vea
  test("viskab vea kui nimi puudub", async () => {
    await expect(userService.createUser("", "test@test.ee")).rejects.toThrow("Name and email are required")
  });

  test("viskab vea kui email puudub", async () => {
    await expect(userService.createUser("Test", "")).rejects.toThrow("Name and email are required")
  });
});
