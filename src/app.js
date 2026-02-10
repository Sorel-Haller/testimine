const path = require("path");
const YAML = require("yamljs");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const prisma = require("./prismaClient");

const UserRepository = require("./repositories/userRepository");
const WorkshopRepository = require("./repositories/workshopRepository");
const BookingRepository = require("./repositories/bookingRepository");

const UserService = require("./services/userService");
const WorkshopService = require("./services/workshopService");
const BookingService = require("./services/bookingService");

const UserController = require("./controllers/userController");
const WorkshopController = require("./controllers/workshopController");
const BookingController = require("./controllers/bookingController");

const healthRoutes = require("./routes/healthRoutes");
const createUserRoutes = require("./routes/userRoutes");
const createWorkshopRoutes = require("./routes/workshopRoutes");
const createBookingRoutes = require("./routes/bookingRoutes");

// --- Wiring (dependency injection) ---
const userRepository = new UserRepository(prisma);
const workshopRepository = new WorkshopRepository(prisma);
const bookingRepository = new BookingRepository(prisma);

const userService = new UserService(userRepository);
const workshopService = new WorkshopService(workshopRepository);
const bookingService = new BookingService(bookingRepository, workshopRepository);

const userController = new UserController(userService);
const workshopController = new WorkshopController(workshopService);
const bookingController = new BookingController(bookingService);

// --- Express app ---
const app = express();

app.use(cors());
app.use(express.json());

// Swagger
const swaggerDocument = YAML.load(
  path.join(__dirname, "../docs/openapi.yaml")
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use(healthRoutes);
app.use(createUserRoutes(userController));
app.use(createWorkshopRoutes(workshopController));
app.use(createBookingRoutes(bookingController));

module.exports = app;
