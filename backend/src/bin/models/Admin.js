const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    password: String
})

var Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;