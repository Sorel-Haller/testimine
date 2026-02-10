const WorkshopService = require("../../src/services/workshopService");

describe("WorkshopService", () => {
  let mockWorkshopRepo;
  let workshopService;

  beforeEach(() => {
    mockWorkshopRepo = {
      create: jest.fn(),
      findById: jest.fn(),
    };

    workshopService = new WorkshopService(mockWorkshopRepo);
  });

  // TODO: Ülesanne — Workshop loomine õnnestub
  test.todo("loob workshop'i edukalt");

  // TODO: Ülesanne — Puuduv title või capacity viskab vea
  test.todo("viskab vea kui title puudub");

  test.todo("viskab vea kui capacity puudub");
});
