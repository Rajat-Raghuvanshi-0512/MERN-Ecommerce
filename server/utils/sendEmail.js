const nodeMailer = require('nodemailer');

exports.sendEmail = async (options) => {
    try {
        const { email, subject, message, html } = options

        //For development
        // const transporter = nodeMailer.createTransport({
        //     host: "smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: process.env.SMTP_USER,
        //         pass: process.env.SMTP_PASSWORD
        //     }
        // });

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
            text: message,
            html
        }
        await transporter.sendMail(mailOptions)
    } catch (err) {
        console.log(err);
    }
}