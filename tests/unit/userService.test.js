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
  test.todo("loob kasutaja edukalt");

  // TODO: Ülesanne — Puuduv nimi või email viskab vea
  test.todo("viskab vea kui nimi puudub");

  test.todo("viskab vea kui email puudub");
});
