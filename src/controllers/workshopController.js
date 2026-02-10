class WorkshopController {
  constructor(workshopService) {
    this.workshopService = workshopService;
  }

  async create(req, res) {
    try {
      const { title, capacity } = req.body;
      const workshop = await this.workshopService.createWorkshop(
        title,
        capacity
      );
      res.status(201).json(workshop);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = WorkshopController;
