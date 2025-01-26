require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes/routes");
const corsOptions = require("./config/corsOptions");

// General setup
const app = express();
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

// Server
app.listen(process.env.PORT, () =>
  console.log(`server initialized in port ${process.env.PORT}`)
);
