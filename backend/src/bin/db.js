const mongoose = require('mongoose');
const { update } = require('./models/Admin');

const MONGO_URI = 'mongodb://localhost:27017/parking-system';

//Models
const Admin = require('./models/Admin');
const Record = require('./models/ParkingRecords');

//Connection
class Controller{
    constructor(){
        this.connect();
    }
    async connect(){
        try{
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true
            })

            console.log("Connected to the database");
        }
        catch(err){
            console.log(err);
        }
    }

    //Queries

    //Add a new admin
    addAdmin(res, data){
        Admin.create(data, (err, newAdmin) => {
            if(err) throw err;
            res.json({
                status: 200,
                message: 'Admin created',
                admin: newAdmin
            })

        })
    }

    //Login into an account
    login(res, data){
        Admin.findOne({
            $and: [{email:data.email},{password:data.password}]
        }, (err, admin) => {
            if(err) throw err;
            res.json({
                status: 200,
                message: 'Logged correctly',
                admin
            })
        })
    }


    updateAdmin(res, id, data){
        Admin.updateOne({
            _id: id
        }, data, (err, updatedAdmin) => {
            if(err) throw err
            res.json({
                status:200,
                message: "Admin updated correctly",
                admin: updatedAdmin
            })
        })
    }


    getAdmins(res, id){
        Admin.findOne({
            _id: id
        }, (err, user) => {
            if(err) throw err
            res.json({
                status:200,
                message:"Admin found",
                user
            })
        })
    }

    deleteAdmin(res, id){
        Admin.deleteOne({
            _id: id
        }, (err) => {
            if(err) throw err
            res.json({
                status:200,
                message:"Correctly deleted"
            })
        })
    }
}


exports.db = new Controller();