require("dotenv").config();
//Import express module
const express = require("express");
//create an instance of the express application
const app = express();
const path = require("path");
const PORT = 3000;
const cors = require("cors");
const { logger } = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");
const corsOptions = require("./config/corsOptions.js");
const connectDB = require("./config/dbConfig.js");
const mongoose = require("mongoose");

const { verifyAdmin, verifyUser } = require("./middleware/authMiddleware");


//ConnectDB
connectDB();

//Custom middlerware functions
app.use(logger);

//Cross-origin resource sharing
app.use(cors(corsOptions));

//Built in middlerware functions
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use("/data", express.static(path.join(__dirname, "data")));

// Routes
app.use("/", require("./routes/root.js"));
app.use('/api/auth/register', require('./routes/api/auth/register.js'));
app.use('/api/auth/login', require('./routes/api/auth/auth.js'));

app.use("/api/events", require('./routes/api/event.js'))
// Admin only event routes
//app.use("/api/events", verifyAdmin, require("./routes/api/event.js"));

// Booking Routes (User Only)
app.use("/api/bookings", verifyUser, require("./routes/api/book.js")); // Users book tickets


app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
