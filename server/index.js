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

// =====================
// === GROUP 20 WORK ===
// =====================

// READ (remaining vouchers)
app.get("/api/vouchersremaining", (req, res) => {
    const voucherRead = "SELECT COUNT(*) as Count FROM tickets WHERE issued_to is NULL;"
    db.query(voucherRead, (err, result) => {
        if(err){
            throw err;
        }
        res.send(result);
    })
})

// READ (volunteers who don't have a voucher assigned)
app.get("/api/unrewardedvolunteercount", (req, res) => {
    const checkVolunteers = "SELECT COUNT(*) as Count FROM volunteers LEFT OUTER JOIN tickets on volunteers.id = tickets.issued_to WHERE is_issued is NULL"
    db.query(checkVolunteers, (err, result) => {
        if (err){
            throw err;
        }
        res.send(result);
    })
})

// READ (get only volunteers without voucher)
app.get("/api/unrewardedvolunteers", (req,res) => {
    const getVolunteers = "SELECT * FROM volunteers LEFT OUTER JOIN tickets on volunteers.id = tickets.issued_to WHERE is_issued is NULL;"
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
    // get params from req.body.variableName
    personId = parseInt(req.body.personId)
    ticket = req.body.ticket;

    const update = "UPDATE tickets SET issued_to = ?, is_issued = 1 WHERE ticketCode = ?;"
    db.query(update, [personId, ticket], (err, result) => {
        if(err) {
            throw err;
        }
        res.send(result)
    })
})

// UPDATE (undo the voucher assignment move)
app.post("api/resetdb", (req, res) => {
    // get params from req.body.varableName

    const update = "DELETE FROM tickets; INSERT INTO tickets (ticketCode, is_issued, issued_on, issued_to) VALUES ('000aaa00', 1, 0, 258), ('000kkk00', 1, 0, 271), ('111bbb11', 1, 0, 256), ('111lll11', 1, 0, 257), ('222ccc22', 1, 0, 257), ('333ddd33', 0, 0, NULL), ('333nnn33', 0, 0, NULL), ('444eee44', 1, 0, 272), ('444ooo44', 0, 0, NULL), ('555fff55', 0, 0, NULL), ('555ppp55', 0,0, NULL), ('555zzz55', 0,0, NULL), ('666ggg66', 0, 0, NULL), ('666qqq66', 0, 0, NULL), ('777hhh77', 0, 0, NULL), ('777rrr77', 0, 0, NULL), ('888iii88', 0, 0, NULL), ('888sss88', 0, 0, NULL), ('999jjj99', 0, 0, NULL), ('999ttt99', 0, 0, NULL); DELETE FROM volunteers; INSERT INTO volunteers (id, first_name, last_name, email_address, time_in) VALUES (256, 'Keri', 'Hallau', 'keri.hallau@montana.edu', NULL), (257, 'Britney', 'Gibbs', 'brit@demo.com', NULL), (258, 'Daniel', 'DeFrance', 'dan@gmail.com', NULL), (274, 'John', 'Brown', 'dont message@gmail.com', NULL), (275, 'Joey', 'Schlabotnik', 'elebentyseven@yoohoo.com', NULL), (276, 'Mal', 'Roberts', 'mal.rob@icloud.com', NULL), (277, 'Mak', 'B', 'mickie@gmail.com', NULL), (278, 'Con', 'Carl', 'CMAN@gmail.com', NULL), (279, 'bananas', 'foster', 'eatmeup.com', NULL);"
    db.query(update, [personId], (err, result) => {
        if(err) {
            throw err;
        }
        res.send(result)
    })
})

// ====== END GROUP 20 ======

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

