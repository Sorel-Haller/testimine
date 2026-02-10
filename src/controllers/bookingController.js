class BookingController {
  constructor(bookingService) {
    this.bookingService = bookingService;
  }

  async create(req, res) {
    try {
      const { userId, workshopId } = req.body;
      const booking = await this.bookingService.createBooking(
        userId,
        workshopId
      );
      res.status(201).json(booking);
    } catch (err) {
      if (err.message === "Workshop not found") {
        return res.status(404).json({ error: err.message });
      }
      if (
        err.message === "Workshop is full" ||
        err.message === "User already booked this workshop"
      ) {
        return res.status(409).json({ error: err.message });
      }
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = BookingController;
