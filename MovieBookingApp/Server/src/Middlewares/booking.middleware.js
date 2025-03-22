const mongoose = require("mongoose");
const ShowModel = require("../Model/show.model");


const validateBooking = async (req, res, next) => {
    const { show, seats, transactionId } = req.body;
    console.log(show, seats, transactionId);
    if (!show) {
        return res.status(400).send("ShowId is required");
    }
    if (mongoose.Types.ObjectId.isValid(show) === false) {
        return res.status(400).send("Invalid ShowId");
    }
    const showDetails = await ShowModel.findById(show);
    if (!showDetails) {
        return res.status(400).send("Invalid ShowId");
    }
    if (!seats || seats.length === 0) {
        return res.status(400).send("Seats are required");
    }
    seats.forEach(seat => {
        if (showDetails.bookedSeats.includes(seat)) {
            return res.status(400).send("Seat is already booked");
        }
    });
    if (!transactionId) {
        return res.status(400).send("TransactionId is required");
    }
    next();
}

module.exports = {
    validateBooking
}