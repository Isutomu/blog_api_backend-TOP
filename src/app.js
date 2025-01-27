require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes/routes");
const corsOptions = require("./config/corsOptions");

// General setup
const app = express();
app.use(cors());
// app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/", cors(corsOptions), routes);
app.use("/", routes);

// Server
app.listen(process.env.PORT, () =>
  console.log(`server initialized in port ${process.env.PORT}`)
);
