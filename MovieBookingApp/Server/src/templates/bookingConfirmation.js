module.exports = (showDetails, bookingDetails)=>{
 
    const subject = "Booking Confirmed";

    const body =  `<html>
            <head>

            </head>

            <body>
                <h3>
                Booking Confirmed for show: ${showDetails._id} and booking ${bookingDetails._id}
                </h3>
            </body>

        </html>`;


    return {subject, body};

}