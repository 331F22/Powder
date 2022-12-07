const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const dotenv = require('dotenv').config()
const emailer = require('./emailer/emailer')


const db = mysql.createPool({ // createConnection
    host: 'localhost',
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
    const sqlSelect = "SELECT DISTINCT first_name, last_name, email_address FROM volunteers order by last_name;"
    db.query(sqlSelect, (err, result) => { 
        if(err){
            throw err;
        }
        res.send(result);
    })
})

// READ VOLUNTEERS BY EVENT ID
app.get("/api/read/:event_id", (req, res) => {
    const ea = req.params.event_id
    const sqlSelect = "SELECT * FROM volunteers where event_id = ? order by last_name;"
    db.query(sqlSelect, [ea], (err, result) => {        
        if(err){
            throw err;
        }
        
        res.send(result);
    })
})

// READ EVENTS 
app.get("/api/readEvents", (req, res) => {
    const sqlSelect = "SELECT event_id, event_name, DATE_FORMAT(event_date, '%m/%d/%Y') as event_date FROM events;"
    db.query(sqlSelect, (err, result) => {        
        if(err){
            throw err;
        }
        res.send(result);
    })
})

//email participants
app.get("/api/sendvouchers", (req, res) => {

    const sqlSelect = "SELECT * FROM volunteers;"
    db.query(sqlSelect, (err, result) => { 
        if(err){
            throw err;
        }
        console.log(result)
        for(var i = 0; i < result.length; i++){

            first = result[i].first_name
            last = result[i].last_name
            email = result[i].email_address
            voucher = 'FAKE1234'
            message = emailer.generateVoucherMessage(first, last, email, voucher)
            emailer.sendMail(message)
        }
        res.send(result);
    })
})

// CREATE
app.post("/api/create", (req, res) => {
    console.log("entry received:")
    const fn = req.body.first
    const ln = req.body.last
    const ea = req.body.email
    const ev = req.body.event
    console.log(fn + " " + ln + " " + ea);
    const sqlInsert = "INSERT INTO volunteers (first_name, last_name, email_address, event_id) VALUES (?,?,?,?);"
    db.query(sqlInsert, [fn, ln, ea, ev], (err, result) => {
        if(err) throw err
        console.log("Server posted: ", fn, ln)
        res.send(result)
    })
}) 

// CREATE EVENT
app.post("/api/createEvent", (req, res) => {
    console.log("entry received:")
    const nm = req.body.event_name
    const dt = req.body.event_date
    const sqlInsert = "INSERT INTO events (event_name, event_date) VALUES (?,?);"
    db.query(sqlInsert, [nm,dt], (err, result) => {
        if(err) throw err
        console.log("Server posted: ", nm)
        res.send(result)
    })
}) 

// DELETE
app.delete("/api/delete/:emailAddress", (req, res) => {
    const ea = req.params.emailAddress;
    console.log(ea)
    const sqlDelete = "DELETE FROM volunteers WHERE email_address = ?";
    db.query(sqlDelete, [ea], (err, result) => {
        if(err) throw err
        console.log("Server: deleted: ", ea)
        res.send(result)
    }) 
})

// DELETE EVENT
app.delete("/api/deleteEvent/:event_id", (req, res) => {
    const id = req.params.event_id;
    console.log(id)
    const sqlDelete = "DELETE FROM events WHERE event_id = ?";
    db.query(sqlDelete, [id], (err, result) => {
        if(err) throw err
        console.log("Server: deleted: ", id)
        res.send(result)
    }) 
})

// UPDATE
app.put("/api/update", (req, res) => {
    const ne = req.body.new;
    const oe = req.body.old;
    console.log("Ready to change: ", oe, "to", ne)
    const sqlUpdate = "UPDATE volunteers SET email_address = ? WHERE email_address = ?"
    db.query(sqlUpdate, [ne, oe], (err, result)=>{
        if(err)  throw err;
        console.log("Server changed: ", oe, "to", ne)
        res.send(result)
    })
})

// UPDATE EVENT NAME AND DATE
app.put("/api/updateEvent", (req, res) => {
    const nm = req.body.newName;
    const dt = req.body.newDate;
    const id = req.body.event_id;
    console.log("Updating event: " + id)
    const sqlUpdate = "UPDATE events SET event_name = ?, event_date = ? WHERE event_id = ?"
    db.query(sqlUpdate, [nm, dt, id], (err, result)=>{
        if(err)  throw err;
        console.log("Server updated: ", id);
        res.send(result)
    })
})

const PORT = process.env.EXPRESSPORT;
const msg = `Running on PORT ${PORT}`
const dbInfo = `
    <p>
    user: ${process.env.DBUSER}, 
    password: ${process.env.DBPASS}, 
    database: ${process.env.DATABASE}, 
    port: ${process.env.DBPORT} </p>
    `
app.get("/", (req, res) => {
    res.send(`<h1>Express Server</h1><p>${msg}<p>` + dbInfo)
})
app.listen(PORT, () => {
    console.log(msg)
})

