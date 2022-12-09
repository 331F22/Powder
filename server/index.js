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

// READ VOLUNTEERS BY EVENT ID FROM DB
function getVolunteersByEventId(eventId){
    return new Promise((resolve, reject)=>{
        const sqlSelect = "SELECT * FROM volunteers where event_id = ? order by last_name;"
        db.query(sqlSelect, [eventId], (err, result) => {        
            if(err){
                reject(err);
            } 
            resolve(result);
        })
    })
}

// GET VOLUNTEERS BY EVENT ID
app.get("/api/read/:event_id", async (req, res) => {
    const ea = req.params.event_id
    result = await getVolunteersByEventId(ea);
    res.send(result)
})

// READ EVENTS 
app.get("/api/readEvents", (req, res) => {
    const sqlSelect = "SELECT * FROM events;"
    db.query(sqlSelect, (err, result) => {        
        if(err){
            throw err;
        }
        res.send(result);
    })
})

// GET VOUCHERS FROM DB
function getNUnusedVouchers(n) {
    return new Promise((resolve, reject) => {
        const sqlSelect = "SELECT * FROM tickets where is_issued = 0;"
        db.query(sqlSelect, [n], (err, result) => {        
            if(err){
                reject(err);
            } 
        resolve(result);
        });
    })
}

// UPDATE VOUCHERS IN DB
function assignVoucher(TicketCode, user_id) {
    return new Promise((resolve, reject) => {
        const sqlUpdate = "UPDATE tickets SET is_issued = 1, issued_to = ?, issued_on = NOW() WHERE ticketCode = ?"
        db.query(sqlUpdate, [user_id, TicketCode], (err, result) => {        
            if(err){
                reject(err);
            } 
        resolve(result);
        });
    })
}

//ASSIGN VOUCHERS TO PARTICIPANTS BY EVENT ID
app.get("/api/issuevouchers/:event_id", async (req, res) => {
    volunteers = await getVolunteersByEventId(req.params.event_id);
    volunteerCount = volunteers.length;

    vouchers = await getNUnusedVouchers(volunteerCount);

    assignments = []
    volunteers.map((val, i) => {
        assignments.push({"user_id":val.id, "voucher_id": vouchers[i].ticketCode})
    });

    assignments.forEach(element => {
        assignVoucher(element.voucher_id, element.user_id);        
    });
})

//email participants by event ID
app.get("/api/sendvouchers/:event_id", (req, res) => {

    eventId = req.params.event_id;
    const sqlSelect = "SELECT * FROM volunteers JOIN tickets ON volunteers.id = tickets.issued_to WHERE event_id = ? ;";

    db.query(sqlSelect, [eventId], (err, result) => { 
        if(err){
            throw err;
        }
        for(var i = 0; i < result.length; i++){
            first = result[i].first_name
            last = result[i].last_name
            email = result[i].email_address
            voucher = result[i].ticketCode
            message = emailer.generateVoucherMessage(first, last, email, voucher)
            emailer.sendMail(message)
        }
        res.send(result);
    })
})

// CREATE
app.post("/api/create", (req, res) => {
    const fn = req.body.first
    const ln = req.body.last
    const ea = req.body.email
    const ev = req.body.event
    const sqlInsert = "INSERT INTO volunteers (first_name, last_name, email_address, event_id) VALUES (?,?,?,?);"
    db.query(sqlInsert, [fn, ln, ea, ev], (err, result) => {
        if(err) throw err
        res.send(result)
    })
}) 


// DELETE
app.delete("/api/delete/:emailAddress", (req, res) => {
    const ea = req.params.emailAddress;
    const sqlDelete = "DELETE FROM volunteers WHERE email_address = ?";
    db.query(sqlDelete, [ea], (err, result) => {
        if(err) throw err
        res.send(result)
    }) 

})

// UPDATE
app.put("/api/update", (req, res) => {

    const ne = req.body.new;
    const oe = req.body.old;
    const sqlUpdate = "UPDATE volunteers SET email_address = ? WHERE email_address = ?"
    db.query(sqlUpdate, [ne, oe], (err, result)=>{
        if(err)  throw err;
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

