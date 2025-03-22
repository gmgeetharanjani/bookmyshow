const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./src/db/dbServer");
const userRoutes = require("./src/Routes/user.routes");
const movieRoutes = require("./src/Routes/movie.routes");
const theatreRoutes = require("./src/Routes/theatre.routes");
const showRoutes = require("./src/Routes/show.routes");
const bookingRoutes = require("./src/Routes/booking.routes");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
connectDB();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
});


app.use(bodyParser.json());
app.use(cors());
app.use(limiter);
app.use(mongoSanitize());

userRoutes(app);
movieRoutes(app);
theatreRoutes(app);
showRoutes(app);
bookingRoutes(app);


app.listen(8082,()=>{
    console.log("Serving is running on port 8082");
})