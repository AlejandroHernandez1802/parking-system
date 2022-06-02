const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Settings
app.use(bodyParser.json());
app.use(cors());

const { db } = require('./db')

//Routes

//Admin routes

//Register admin
app.post('/api/admins', (req, res) => {
    let data = req.body;
    db.addAdmin(res, data);
})

//Admin login
app.post('/api/login', (req, res) => {
    let data = req.body;
    db.login(res, data);
})

//Update admin: failed
app.put('api/admins/:id', (req,res) => {
    let { id } = req.params;
    let data = req.body;
    db.updateAdmin(res, id, data);
})

//Get specific admin 
app.get('/api/admin/:id', (req, res) => {
    let {id} = req.params;
    db.getAdmin(res, id);
})

//Get all admins 
app.get('/api/allAdmins/', (req, res) => {
    db.getAllAdmins(res);
})

//Delete admin
app.delete('/api/admins/:id', (req, res) => {
    let {id} = req.params;
    db.deleteAdmin(res, id);
})







//Parking records routes

//Create a new record
app.post('/api/createRecord', (req, res) => {
    let data = req.body;

    db.addRecord(res, data);
})

//get specific records made by an admin
app.get('/api/adminRecords/:adminId', (req, res) => {
    let {adminId} = req.params;
    db.getAdminRecords(res, adminId);
})

//getActiveRecords
app.get('/api/activeRecords', (req, res) => {
    db.getActiveRecords(res);
})


//get all records
app.get('/api/allRecords', (req, res) => {
    db.getAllRecords(res);
})


//Update record hours when the user is out
app.put('/api/userExit/:recordId', (req, res) => {
    let data = req.body;
    let{ recordId } = req.params;

    db.userExit(res, recordId, data);
})


//Update hide info when the admin click in the specific button
app.put('/api/hideRecord/:recordId', (req, res) => {
    let data = req.body;
    let{ recordId } = req.params;

    db.hideRecord(res, recordId, data);
})


exports.app = app;