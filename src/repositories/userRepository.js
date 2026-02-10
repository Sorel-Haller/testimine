class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}

module.exports = UserRepository;
