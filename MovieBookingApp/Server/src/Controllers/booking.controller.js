const BookingModel = require('../Model/booking.model');
const ShowModel = require('../Model/show.model');
const bookingConfirmation = require('../templates/bookingConfirmation');
const { sendEmail } = require('../Utils/emailUtility');


const stripe_secret_key = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripe_secret_key);

const makePayment = async (req, res) => {
    try {
        const { token, amount } = req.body;
        let transactionId = Date.now().toString(36) + Math.random().toString(36).substring(14);

        // create new stripe customer
        const customer = await stripe.customers.create({
            email: req.userDetails.email,
            source: token.id
        });

        console.log('customer', customer);

        // create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: req.userDetails.email,
            payment_method_types: ['card'],
            description: `Booking Payment for ${req.userDetails.email}`,
            metadata: { integration_check: 'accept_a_payment', booking_id: transactionId }
        });

        console.log("paymentintent", paymentIntent);

        if (!paymentIntent) {
            return res.status(400).send({ success: false, message: "Payment Failed" });
        }

        res.send({
            success: true,
            message: "Payment Successful",
            data: {
                amount: amount,
                transactionId: transactionId
            }
        });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error", error: err });
    }
}

const createBooking = async (req, res) => {
    const { show, seats, transactionId } = req.body;
    console.log(show, seats, transactionId);
    const userId = req.userDetails._id;
    try { 
        const newBooking = new BookingModel({
            show: show,
            seats: seats,
            user: userId,
            transactionId: transactionId
        });

        const dbResponse = await newBooking.save();

        if (!dbResponse) {
            return res.status(500).send({ success: false, message: "Internal Server Error" });
        }
        const showDetails = await ShowModel.findById(show);
        console.log(showDetails);
        const updatedBookingSeats = [...showDetails.bookedSeats, ...seats];

        await ShowModel.findByIdAndUpdate(show, { bookedSeats: updatedBookingSeats });

        const {subject, body} = bookingConfirmation(showDetails, newBooking);
        sendEmail([req.userDetails.email], subject, body);
        res.send({
            success: true,
            message: "Booking Created Successfully",
            data: dbResponse
        });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error", error: err });
    }
}


module.exports = {
    makePayment,
    createBooking
}