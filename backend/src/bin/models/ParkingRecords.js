const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ParkingSchema = new Schema({
    username: String,
    userid: String,
    vehiclenumber: String,
    vehicletype: String,
    vehicledescription: String,
    checkindate: Date,
    checkintime: String,
    departuredate: String,
    departuretime: String,
    status:  {
        type: Boolean,
        default: true
    },
    adminincharge:{
        ref:'Admin',
        type: Schema.Types.ObjectId
    },
    hide:{
        type: Boolean,
        default: false
    }
})

var Record = mongoose.model('Record', ParkingSchema);

module.exports = Record;