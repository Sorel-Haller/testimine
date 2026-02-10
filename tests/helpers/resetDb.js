const prisma = require("../../src/prismaClient");

async function resetDb() {
  await prisma.booking.deleteMany();
  await prisma.user.deleteMany();
  await prisma.workshop.deleteMany();
}

module.exports = { resetDb };
