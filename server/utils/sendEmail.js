const nodeMailer = require('nodemailer');

exports.sendEmail = async (options) => {
    try {
        const { email, subject, message } = options
        const transporter = nodeMailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: subject,
            text: message
        }
        await transporter.sendMail(mailOptions)
    } catch (err) {
        console.log(err);
    }
}