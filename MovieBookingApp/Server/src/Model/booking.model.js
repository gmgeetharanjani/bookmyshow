const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema(
    {
        show: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "shows",
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        seats: {
            type: [],
            required: true
        },
        transactionId: {
            type: String,
            required: false // make it required later
        }
    }
);

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = BookingModel;