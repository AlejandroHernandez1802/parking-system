const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ParkingSchema = new Schema({
    userName: String,
    userId: String,
    vehicleNumber: String,
    vehicleType: String,
    vehicleDescription: String,
    date: Date,
    time: String,
    status:  {
        type: Boolean,
        default: false
    }
})

var Record = mongoose.model('Record', ParkingSchema);

module.exports = Record;