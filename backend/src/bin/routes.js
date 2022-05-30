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


exports.app = app;