const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')
const bcrypt = require("bcrypt")
const dotenv = require('dotenv').config()
const sessionstorage = require('sessionstorage');
const randomstring = require("randomstring");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const db = mysql.createPool({ // createConnection
    host: '127.0.0.1',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// READ
app.get("/api/read", (req, res) => {


    const sqlSelect = "SELECT * FROM volunteers;"
    db.query(sqlSelect, (err, result) => {
        if(err){
            throw err;
        }
        res.send(result);
    });
});

// CREATE
app.post("/api/create", (req, res) => {
    const fn = req.body.first
    const ln = req.body.last
    const ea = req.body.email
    const pn = req.body.phone

    const firstname = SanitizeData(fn);
    const lastname = SanitizeData(ln);
    const email = SanitizeData(ea);
    const phonenum = SanitizeData(pn);


    if (firstname === false) {
        res.send({Auth: false});
        console.log("Invalid characters detected\nInjection Attempt Detected, Logging results!");
        return;
    }
    if (lastname === false) {
        res.send({Auth: false});
        console.log("Invalid characters detected\nInjection Attempt Detected, Logging results!");
        return;
    }
    if (email === false) {
        res.send({Auth: false});
        console.log("Invalid characters detected\nInjection Attempt Detected, Logging results!");
        return;
    }
    if (email === false) {
        res.send({Auth: false});
        console.log("Invalid characters detected\nInjection Attempt Detected, Logging results!");
        return;
    }


    const sqlInsert = "INSERT INTO volunteers (first_name, last_name, email_address, phone_number) VALUES (?,?,?,?);"
    db.query(sqlInsert, [fn, ln, ea, pn], (err, result) => {
        if(err) throw err
        console.log("Server posted: ", fn, ln, ea, pn)
        res.send(result)
    });
});


// Admin Login
app.post("/api/Login", (req, res) => {
    const Username = req.body.Uname;
    const Password = req.body.Pword;

    const UsernameS = SanitizeData(Username);
    const PasswordS = SanitizeData(Password);

    if (UsernameS === false) {
        res.send({Auth: false});
        console.log("Invalid characters detected\nInjection Attempt Detected, Logging results!");
        return;
    }


    const sqlSelect = "SELECT * FROM developers WHERE username=?;"
    db.query(sqlSelect, [Username], (err, result) => {
        if(err){
            throw err;
        }
        // console.log(result);
        const PassW = result[0];
        if (result.length > 0) {
            bcrypt.compare(Password, PassW.password, function(err, result) {
                if (result) {
                   console.log("Match Found, bcrypt worked!");
                   res.send({Auth: true, email: PassW.email, phone: PassW.phone});
                } else {
                    console.log("Error, Invalid Admin Login Attempt!\nLogging User Request for Inspection!");
                    res.send({Auth: false});
               }
            });

        } else {
            console.log("Error, Invalid Admin Login Attempt!\nLogging User Request for Inspection!");
            console.log("User Not Found");
            res.send({Auth: false});
        }


    });

});


// Two Step SMS
app.post("/api/TwoStepPhone", (req, res) => {

    const Phone = req.body.phone;

    const SecNum = randomstring.generate(8);

    // Send to Phone using API
    console.log("Security Number: ", SecNum);
    console.log("Sending to: ", Phone);
    
    sessionstorage.setItem(Phone, SecNum);

    res.sendStatus(200);

});

// verifys SMS Two Step code
app.post("/api/VerifySMS", (req, res) => {

    const SecNum = req.body.secnum;
    const Phone = req.body.phone;
    const validNumber = sessionstorage.getItem(Phone);

    console.log("Sess storage: ",validNumber);

    if (SecNum == validNumber) {
        sessionstorage.removeItem(Phone);
        res.send({Auth: true});
    } else {
        res.send({Auth: false});
    }

});



// Two Step Email
app.post("/api/TwoStepEmail", (req, res) => {

    const Email = req.body.email;

    // generate random code and set to SecNum
    
    const SecNum = randomstring.generate(8);
    
    console.log("Sending two step code to Email....");

    sessionstorage.setItem(Email, SecNum);

    const msg = {
        to: Email,
        from: 'Tempbsf@gmail.com',
        subject: 'Validation Code',
        text: 'Validation CODE: ' + SecNum,
        html: '<strong>Validation CODE: ' + SecNum + '</strong>',
    }

    sgMail.send(msg).then(() => {
        console.log('email sent');
    }).catch((error) => {
        console.error(error);
    });

    // console.log("Checking SessionStorage: ", sessionstorage.getItem(Email));
    res.sendStatus(200);

});

// validates code sent to email
app.post("/api/VerifyTwoStep", (req, res) => {

    const SecNum = req.body.secnum;
    const Email = req.body.email;

    // console.log("Two Setp Auth Code Sent by User", SecNum);

    const validNumber = sessionstorage.getItem(Email);

    // console.log("Sess storage: ",validNumber);

    if (SecNum == validNumber) {
        sessionstorage.removeItem(Email);
        res.send({Auth: true});
    } else {
        res.send({Auth: false});
    }

});



// DELETE
app.delete("/api/delete/:emailAddress", (req, res) => {
    const ea = req.params.emailAddress;
    console.log(ea)
    const sqlDelete = "DELETE FROM volunteers WHERE email_address = ?";
    db.query(sqlDelete, [ea], (err, result) => {
        if(err) throw err
        console.log("Server: deleted: ", ea)
        res.send(result)
    });
});


app.delete("/api/delete/:phone_number", (req, res) => {
    const pn = req.params.phoneNumber;
    console.log(pn);
    const sqlDelete = "DELETE FROM volunteers WHERE phone_number = ?";
    db.query(sqlDelete, [pn], (err, result) => {
        if(err) throw err
            console.log("Server: deleted: ", pn);
        res.send(result);
    });
});

// UPDATE
app.put("/api/update", (req, res) => {
    // console.log(req)

    const ne = req.body.new;
    const oe = req.body.old;
    console.log("Ready to change: ", oe, "to", ne)
    const sqlUpdate = "UPDATE volunteers SET email_address = ? WHERE email_address = ?"
    db.query(sqlUpdate, [ne, oe], (err, result)=>{
        if(err)  throw err;
        console.log("Server changed: ", oe, "to", ne)
        res.send(result)
    });
});

app.put("/api/update/phone", (req, res) => {
    const ne = req.body.new;
    const oe = req.body.old;

    console.log("ready to change: ", oe, "to", ne)
    const sqlUpdate = "UPDATE volunteers SET phone_number = ? WHERE phone_number = ?";
    db.query(sqlUpdate, [ne, oe], (err, result) => {
        if(err) throw err;
        console.log("Server changed: ", oe, "to", ne);
        res.send(result);
    });
});

const PORT = process.env.EXPRESSPORT;
const msg = `Running on PORT ${PORT}`
app.get("/", (req, res) => {
    res.send(`<h1>Express Server</h1><p>${msg}<p>`)
})
app.listen(PORT, () => {
    console.log("\n\n\n\n\n\n",msg)
})




function SanitizeData(data) {
    if (data.includes("`") === true ) {
        return false;
    } else if (data.includes("=") === true) {
        return false;
    } else if (data.includes("<") === true) {
        return false;
    } else if (data.includes(";") === true) {
        return false;
    } else if (data.includes("'") === true) {
        return false;
    } else {
        return true;
    }
}