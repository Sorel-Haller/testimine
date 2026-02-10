const request = require("supertest");
const app = require("../../src/app");
const { resetDb } = require("../helpers/resetDb");

describe("POST /users", () => {
  beforeEach(async () => {
    await resetDb();
  });

  // TODO: Ülesanne — Loob uue kasutaja
  test.todo("loob uue kasutaja");

  // TODO: Ülesanne — Puuduv nimi tagastab 400
  test.todo("tagastab 400 kui nimi puudub");

  // TODO: Ülesanne — Puuduv email tagastab 400
  test.todo("tagastab 400 kui email puudub");

  // TODO: Ülesanne — Duplikaat-email tagastab 400
  test.todo("tagastab 400 kui email on juba kasutusel");
});
