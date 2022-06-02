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

    //Register a new admin
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

    //Login into an admin account
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

    //Update an admin
    updateAdmin(res, id, data){
        Admin.updateOne({
            _id: id
        }, data, (err, updatedAdmin) => {
            if(err) throw err;
            res.json({
                status:200,
                message: "Admin updated correctly",
                admin: updatedAdmin
            })
        })
    }

    //Get an specific admin
    getAdmin(res, id){
        Admin.findOne({
            _id: id
        }, (err, user) => {
            if(err) throw err;
            res.json({
                status:200,
                message:"Admin found",
                user
            })
        })
    }

    //Get all admins
    getAllAdmins(res){
        Admin.find((err, admin) => {
            if(err) throw err
            res.json({
                status: 200,
                message: "All admins found",
                admin
            })
        })
    }

    //Delete admin
    deleteAdmin(res, id){
        Admin.deleteOne({
            _id: id
        }, (err) => {
            if(err) throw err;
            res.json({
                status:200,
                message:"Correctly deleted"
            })
        })
    }










    


    //Records queries
    addRecord(res, data){
        Record.create(data, (err, record) => {
            if(err) throw err;
            res.json({
                status:200,
                message: "Record added",
                record
            })
        })
    }

    //get records made by an specific admin
    getAdminRecords(res, adminId){
        Record.find({
            adminincharge: adminId
        }, (err, records) => {
            if(err) throw err;
            res.json({
                status:200,
                message: 'Specific records',
                records
            })
        })
    }

    //Get active records
    getActiveRecords(res){
        Record.find({
            $and: [{hide:false},{status:true}]
        }, (err, records) => {
            if(err) throw err;
            res.json({
                status:200,
                message: 'Active records',
                records
            })
        })
    }


    //Get all records
    getAllRecords(res){
        Record.find({
            $and: [{hide:false},{status:false}]
        }, (err, records) => {
            if(err) throw err;
            res.json({
                status:200,
                message: 'All records',
                records
            })
        })
    }



    //Manage the user exit
    userExit(res, recordId, data){
        Record.updateOne({
            _id: recordId
        }, data, (err,updatedRecord) => {
            if(err) throw err;
            res.json({
                status:200,
                message:"The user left the parking lot.",
                record: updatedRecord
            })
        })
    }

    //Manage the click on the hide button
    hideRecord(res, recordId, data){
        Record.updateOne({
            _id: recordId
        }, data, (err,updatedRecord) => {
            if(err) throw err;
            res.json({
                status:200,
                message:"The record is now hide",
                record: updatedRecord
            })
        })
    }
}


exports.db = new Controller();