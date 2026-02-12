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

  // ✅ Workshop loomine õnnestub
  test("loob workshop'i edukalt", async () => {
    mockWorkshopRepo.create.mockResolvedValue({
      id: 1,
      title: "test workshop",
      capacity: 20,
    });

    const result = await workshopService.createWorkshop(
      "test workshop",
      20
    );

    expect(result).toEqual({
      id: 1,
      title: "test workshop",
      capacity: 20,
    });

    expect(mockWorkshopRepo.create).toHaveBeenCalled();
    expect(mockWorkshopRepo.create).toHaveBeenCalledWith({
      title: "test workshop",
      capacity: 20,
    });
  });

  // ✅ Puuduv title viskab vea
  test("viskab vea kui title puudub", async () => {
    await expect(
      workshopService.createWorkshop("", 20)
    ).rejects.toThrow("Title and capacity are required");
  });

  // ✅ Puuduv capacity viskab vea
  test("viskab vea kui capacity puudub", async () => {
    await expect(
      workshopService.createWorkshop("test workshop", null)
    ).rejects.toThrow("Title and capacity are required");
  });
});
