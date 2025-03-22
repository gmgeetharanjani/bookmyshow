const {makePayment, createBooking} = require("../Controllers/booking.controller");
const { verifyJWT } = require("../Middlewares/auth.middleware");
const { validateBooking } = require("../Middlewares/booking.middleware");

module.exports = (app)=>{
    app.post("/payment",[verifyJWT], makePayment); //all logged in user can access this route
    app.post("/booking", [verifyJWT, validateBooking], createBooking); //all logged in user can access this route
}