const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, body) => {
    const receipientEmailIds = email.join(",");
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "gmgeetharanjani@gmail.com",
            pass: "pugo cdma cqdj bzfc"
        }
    });
    const mailOptions = {
        from: "gmgeetharanjani@gmail.com",
        to: receipientEmailIds,
        subject: subject,
        html: body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error in sending email", error);
        } else {
            console.log('Email sent to: ' + receipientEmailIds + ' ' + info.response);
        }
    });

}

module.exports = {  
    sendEmail
}