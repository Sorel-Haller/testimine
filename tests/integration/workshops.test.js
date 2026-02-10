const request = require("supertest");
const app = require("../../src/app");
const { resetDb } = require("../helpers/resetDb");

describe("POST /workshops", () => {
  beforeEach(async () => {
    await resetDb();
  });

  // TODO: Ülesanne — Workshop loomine õnnestub
  test.todo("loob uue workshop'i");

  // TODO: Ülesanne — Puuduv title tagastab 400
  test.todo("tagastab 400 kui title puudub");
});
