class WorkshopService {
  constructor(workshopRepository) {
    this.workshopRepository = workshopRepository;
  }

  async createWorkshop(title, capacity) {
    if (!title || capacity === undefined || capacity === null) {
      throw new Error("Title and capacity are required");
    }

    return this.workshopRepository.create({ title, capacity });
  }
}

module.exports = WorkshopService;
