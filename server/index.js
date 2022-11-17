const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv').config()

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


    const sqlInsert = "INSERT INTO volunteers (first_name, last_name, email_address, phone_number) VALUES (?,?,?,?);"
    db.query(sqlInsert, [fn, ln, ea, pn], (err, result) => {
        if(err) throw err
        console.log("Server posted: ", fn, ln, ea, pn)
        res.send(result)
    });
});

// app.post("/api/create", (req, res) => {
//     const fn = req.body.first
//     const ln = req.body.last
//     const ea = req.body.email
//     const pn = req.body.phone
//     const u2f = "Not Registered";

//     const sqlInsert = "INSERT INTO volunteers (first_name, last_name, email_address, phone_number, u2f_challenge) VALUES (?,?,?,?,?);"
//     db.query(sqlInsert, [fn, ln, ea, pn, u2f], (err, result) => {
//         if(err) throw err
//         console.log("Server posted: ", fn, ln, ea, pn)
//         res.send(result)
//     });
// });



app.post("/api/Login", (req, res) => {
    const Username = req.body.Uname;
    const Password = req.body.Pword;
    console.log(Username, Password);

    if (Username == "Admin"){
        res.send({Auth: true});
    } else {
        console.log("Error, Invalid Admin Login Attempt!\nLogging User Request for Inspection!");
        res.send({Auth: false});
    }

});

app.post("/api/TwoStepEmail", (req, res) => {

    const Email = req.body.email;
    console.log("Sending two step code to Email....");

    res.sendStatus(200);

});

app.post("/api/VerifyTwoStep", (req, res) => {

    const SecNum = req.body.secnum;
    console.log("Two Setp Auth Code Sent by User", SecNum);

    let validNumber = "9898"; 

    if (SecNum == validNumber) {
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
    console.log(msg)
})


