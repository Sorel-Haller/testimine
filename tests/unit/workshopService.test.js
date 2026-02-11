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
  test("loob workshop'i edukalt", async () => {
    mockWorkshopRepo.create.mockResolvedvalue({
      id: 1,
      title: "test workshop",
      capacity: 20
    });
    expect(mockWorkshopRepo.create).toHaveBeenCalled();
    expect(mockWorkshopRepo.create).toHaveBeenCalledWith({
      title: "test workshop",
      capacity: 20
    });
  });

  // TODO: Ülesanne — Puuduv title või capacity viskab vea
  test("viskab vea kui title puudub", async () => {
    await expect(workshopService.createWorkshop("", 20)).rejects.toThrow("Title and capacity are required");
  });

  test("viskab vea kui capacity puudub", async () => {
    await expect(workshopService.createWorkshop("test workshop", null)).rejects.toThrow("Title and capacity are required")
  });
});
