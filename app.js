const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport')

const app = express();
console.log(__dirname);
app.use(express.static(__dirname));// this we get all our static content to be visible on our website ..
app.use(bodyparser.urlencoded({ extended: true }));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    console.log(__dirname);
})

app.post("/", function (req, res) {
    const comm = req.body.Message;
    const nme = req.body.Name;
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gamil',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'mohit8737kumar@gmail.com',
            pass: 'ekomgrhjfoaqybty'
        }
    }));
    var mailOptions = {
        from: 'mohit8737kumar@gmail.com',
        to: req.body.email,
        cc: 'mohit8737kumar@gmail.com',
        subject: 'Thanks for giving feedback ' + nme,
        text: 'Thanks for your email. You have sent to us -->' + comm
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            res.sendFile(__dirname + "/confirmation.html");
            console.log("email sent" + info.response);
        }
    })
});

app.listen(3000, function () {
    console.log("server started ");
})