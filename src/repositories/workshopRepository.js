class WorkshopRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    return this.prisma.workshop.create({ data });
  }

  async findById(id) {
    return this.prisma.workshop.findUnique({ where: { id } });
  }
}

module.exports = WorkshopRepository;
