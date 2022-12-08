const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const dotenv = require('dotenv').config()

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

// READ (remaining vouchers)
app.get("/api/vouchersremaining", (req, res) => {
    const voucherRead = "SELECT is_issued, COUNT(*) AS Count FROM tickets GROUP BY is_issued;"
    db.query(voucherRead, (err, result) => {
        if(err){
            throw err;
        }
        res.send(result);
    })
})

// READ (volunteers who don't have a voucher assigned)
app.get("/api/unrewardedvolunteercount", (req, res) => {
    const checkVolunteers = "select is_issued, COUNT(*) as Count from volunteers LEFT join tickets on volunteers.id = tickets.issued_to GROUP BY is_issued;"
    db.query(checkVolunteers, (err, result) => {
        if (err){
            throw err;
        }
        res.send(result);
    })
})

// READ (get only volunteers without voucher)
app.get("/api/unrewardedvolunteers", (req,res) => {
    const getVolunteers = ""
    db.query(getVolunteers, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

// READ (get only available vouchers)
app.get("/api/getvouchers", (req, res) => {
    const getVouchers = "SELECT * FROM tickets WHERE is_issued = 0;"
    db.query(getVouchers, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

// UPDATE (Assign vouchers to volunteers)
app.put("/api/assignvouchers", (req, res) => {
    console.log("Make the volunteers go in the voucher table")
    // get params from req.body.variableName
    param = 1
    param1 = 2

    const update = ""
    db.query(update, [param, param1], (err, result) => {
        if(err) {
            throw err;
        }
        res.send(result)
    })
})

// READ
app.get("/api/read", (req, res) => {
    const sqlSelect = "SELECT * FROM volunteers;"
    db.query(sqlSelect, (err, result) => {
        if(err){
            throw err;
        }
        res.send(result);
        console.log("Ran a read")
    })
})

// CREATE
app.post("/api/create", (req, res) => {
    const fn = req.body.first
    const ln = req.body.last
    const ea = req.body.email
    const sqlInsert = "INSERT INTO volunteers (first_name, last_name, email_address) VALUES (?,?,?);"
    db.query(sqlInsert, [fn, ln, ea], (err, result) => {
        if(err) throw err
        console.log("Server posted: ", fn, ln)
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
    })
})



const PORT = process.env.EXPRESSPORT;
const msg = `Running on PORT ${PORT}`
app.get("/", (req, res) => {
    res.send(`<h1>Express Server</h1><p>${msg}<p>`)
})
app.listen(PORT, () => {
    console.log(msg)
})

