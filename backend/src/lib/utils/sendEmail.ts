import nodemailer from 'nodemailer';

export async function sendEmail(to: string, html: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'ht2v6wqti7ylhwsp@ethereal.email', // generated ethereal user
            pass: 'QSAn3YwFh3xD8HT5zB', // generated ethereal password
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to, // list of receivers
        subject: 'Hello ✔', // Subject line
        html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
