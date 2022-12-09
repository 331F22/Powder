const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config()

//smtp credentials
const hostname = process.env.SMTPHOST
const portnum = process.env.SMTPPORT
const username = process.env.SMTPUSERNAME
const password = process.env.SMTPPASSWORD
const fromEmail = process.env.SMTPEMAIL


// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
    host: hostname,
    port: portnum,
    secure: false,
    auth: {
        user: username,
        pass: password
    },

    
});

exports.generateVoucherMessage = function (first, last, email, voucherCode){
    //generate message object
    var message = {
        from: fromEmail,
        to: `${first} ${last} <${email}>`,
        subject: 'Thank you for volunteering',
        text: 'Bridger Voucher Code',
        html: `
            <h2>Thank you ${first},</h2>
            <p>Your voucher code is <b>${voucherCode}.</b></p>
            <img alt="BSF logo" width="100px" src="https://uploads-ssl.webflow.com/57b4d56c1f986d4879b0574d/581d0395c6f121fb068e4d22_BSFlogo.jpg">`
    }
    return message;
}

exports.generateConfirmationEmail = function (first, last, email, eventName, date){
    var message = {
        from: fromEmail,
        to: `${first} ${last} <${email}>`,
        subject: 'Volunteer Registration Confirmation',
        text: 'Registration Confirmation',
        html: `
            <h2>Thank you ${first},</h2>
            <h3> Your free ski pass voucher will be emailed at the end of the day.</h3>
            <p> Event Name: ${eventName}</p>
            <p> Event Date: ${date}</p>`
    }
    return message;
}


exports.sendMail = function(message){
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
    
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

