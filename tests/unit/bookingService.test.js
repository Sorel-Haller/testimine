const BookingService = require("../../src/services/bookingService");

describe("BookingService", () => {
  let mockBookingRepo;
  let mockWorkshopRepo;
  let bookingService;

  beforeEach(() => {
    mockBookingRepo = {
      countBookings: jest.fn(),
      createBooking: jest.fn(),
      findByUserAndWorkshop: jest.fn(),
    };

    mockWorkshopRepo = {
      findById: jest.fn(),
    };

    bookingService = new BookingService(mockBookingRepo, mockWorkshopRepo);
  });

  // Näide — see test on valmis
  test("loob broneeringu kui kohti on", async () => {
    // Arrange
    mockWorkshopRepo.findById.mockResolvedValue({
      id: 1,
      title: "Testing",
      capacity: 10,
    });
    mockBookingRepo.countBookings.mockResolvedValue(3);
    mockBookingRepo.findByUserAndWorkshop.mockResolvedValue(null);
    mockBookingRepo.createBooking.mockResolvedValue({
      id: 1,
      userId: 1,
      workshopId: 1,
    });

    // Act
    const result = await bookingService.createBooking(1, 1);

    // Assert
    expect(result).toEqual({ id: 1, userId: 1, workshopId: 1 });
    expect(mockBookingRepo.createBooking).toHaveBeenCalled();
  });

  // TODO: Ülesanne 1 — Workshop on täis
  test("viskab vea kui workshop on täis", async () => {
    mockWorkshopRepo.findById.mockResolvedValue({
      id: 1,
      title: "Full Workshop",
      capacity: 5,
    });
    mockBookingRepo.countBookings.mockResolvedValue(5);
    mockBookingRepo.findByUserAndWorkshop.mockResolvedValue(null);

    await expect(bookingService.createBooking(1, 1))
    .rejects
    .toThrow("Workshop is full");

    expect(mockBookingRepo.createBooking).not.toHaveBeenCalled();
  });

  // TODO: Ülesanne 2 — Kasutaja on juba broneerinud
  test.todo("viskab vea kui kasutaja on juba broneerinud");

  // TODO: Ülesanne 3 — Workshop ei eksisteeri
  test.todo("viskab vea kui workshop ei eksisteeri");

  // TODO: Edasijõudnud — Kontrolli mock meetodite argumente
  test.todo("kutsub createBooking õigete andmetega");

  // TODO: Edasijõudnud — Kontrolli, et createBooking EI kutsuta
  test.todo("ei kutsu createBooking kui workshop on täis");
});
