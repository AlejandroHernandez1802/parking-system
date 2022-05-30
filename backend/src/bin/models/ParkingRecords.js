const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ParkingSchema = new Schema({
    userName: String(100),
    userId: String(10),
    vehicleNumber: String(6),
    vehicleType: String(50),
    vehicleDescription: String(500),
    date: Date,
    time: String,
    status:  {
        type: Boolean,
        default: false
    }
})

var Record = mongoose.model('Record', ParkingSchema);

module.exports = Record;