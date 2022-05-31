const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Settings
app.use(bodyParser.json());
const { db } = require('./db')

//Routes

//Admin routes
app.post('/api/admins', (req, res) => {
    let data = req.body;
    db.addAdmin(res, data);
})

app.post('/api/login', (req, res) => {
    let data = req.body;
    db.login(res, data);
})


app.put('api/admins/:id', (req,res) => {
    let { id } = req.params;
    let data = req.body;
    db.updateAdmin(res, id, data);
})

app.get('/api/admins/:id', (req, res) => {
    let {id} = req.params;
    db.getAdmins(res, id);
})

app.delete('/api/admins/:id', (req, res) => {
    let {id} = req.params;
    db.deleteAdmin(res, id);
})


//Parking records routes
app.post('/api/records/:adminId', (req, res) => {
    let data = req.body;
    let {adminId} = req.params;
    data.adminincharge = adminId;

    var today = new Date();
    data.checkindate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    data.checkintime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    db.addRecord(res, data);
})

app.get('/api/records/:adminId', (req, res) => {
    let {adminId} = req.params;
    db.getRecords(res, adminId);
})

app.put('/api/userExit/:recordId', (req, res) => {
    let data = req.body;
    let{ recordId } = req.params;

    data.status = false;

    var today = new Date();
    data.departuredate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    data.departuretime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    db.userExit(res, recordId, data);
})


exports.app = app;