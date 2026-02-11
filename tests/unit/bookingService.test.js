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
    test("viskab vea kui kasutaja on juba broneerinud", async () => {
      mockWorkshopRepo.findById.mockResolvedValue({
        id: 1,
        title: "Testing",
        capacity: 10,
      });
      mockBookingRepo.countBookings.mockResolvedValue(3);
      mockBookingRepo.findByUserAndWorkshop.mockResolvedValue({
        id: 99,
        userId: 1,
        workshopId: 1,
      });

      await expect(bookingService.createBooking(1, 1))
        .rejects
        .toThrow("User already booked this workshop");

      expect(mockBookingRepo.createBooking).not.toHaveBeenCalled();
    });
  // TODO: Ülesanne 3 — Workshop ei eksisteeri
    test("viskab vea kui workshop ei eksisteeri", async () => {
      mockWorkshopRepo.findById.mockResolvedValue(null); // Workshop not found
      mockBookingRepo.countBookings.mockResolvedValue(0);
      mockBookingRepo.findByUserAndWorkshop.mockResolvedValue(null);

      await expect(bookingService.createBooking(1, 1))
        .rejects
        .toThrow("Workshop not found");

      expect(mockBookingRepo.createBooking).not.toHaveBeenCalled();
    });
  // TODO: Edasijõudnud — Kontrolli mock meetodite argumente
    test("kutsub createBooking õigete andmetega", async () => {
      mockWorkshopRepo.findById.mockResolvedValue({
        id: 1,
        title: "Testing",
        capacity: 10,
      });

      mockBookingRepo.countBookings.mockResolvedValue(2);
      mockBookingRepo.findByUserAndWorkshop.mockResolvedValue(null);

      mockBookingRepo.createBooking.mockResolvedValue({
        id: 5,
        userId: 1,
        workshopId: 1,
      });

      await bookingService.createBooking(1, 1);

      expect(mockBookingRepo.createBooking).toHaveBeenCalledTimes(1);
      expect(mockBookingRepo.createBooking).toHaveBeenCalledWith({
        userId: 1,
        workshopId: 1,
      });
    });
  // TODO: Edasijõudnud — Kontrolli, et createBooking EI kutsuta
    test("ei kutsu createBooking kui workshop on täis", async () => {
      mockWorkshopRepo.findById.mockResolvedValue({
        id: 1,
        title: "Full Workshop",
        capacity: 2,
      });

      mockBookingRepo.countBookings.mockResolvedValue(2);
      mockBookingRepo.findByUserAndWorkshop.mockResolvedValue(null);

      await expect(
        bookingService.createBooking(1, 1)
      ).rejects.toThrow("Workshop is full");

      expect(mockBookingRepo.createBooking).not.toHaveBeenCalled();
    });
});
