class BookingRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async countBookings(workshopId) {
    return this.prisma.booking.count({ where: { workshopId } });
  }

  async createBooking(data) {
    return this.prisma.booking.create({ data });
  }

  async findByUserAndWorkshop(userId, workshopId) {
    return this.prisma.booking.findUnique({
      where: { userId_workshopId: { userId, workshopId } },
    });
  }
}

module.exports = BookingRepository;
