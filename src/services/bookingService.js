class BookingService {
  constructor(bookingRepository, workshopRepository) {
    this.bookingRepository = bookingRepository;
    this.workshopRepository = workshopRepository;
  }

  async createBooking(userId, workshopId) {
    if (!userId || !workshopId) {
      throw new Error("userId and workshopId are required");
    }

    const workshop = await this.workshopRepository.findById(workshopId);
    if (!workshop) {
      throw new Error("Workshop not found");
    }

    const existingBooking =
      await this.bookingRepository.findByUserAndWorkshop(userId, workshopId);
    if (existingBooking) {
      throw new Error("User already booked this workshop");
    }

    const currentBookings =
      await this.bookingRepository.countBookings(workshopId);
    if (currentBookings >= workshop.capacity) {
      throw new Error("Workshop is full");
    }

    return this.bookingRepository.createBooking({ userId, workshopId });
  }
}

module.exports = BookingService;
