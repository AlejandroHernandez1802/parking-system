const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/parking-system';

class Controller{
    constructor(){
        this.connect();
    }
    async connect(){
        try{
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true
            });

            console.log("Connected to the database");
        }
        catch(err){
            console.log(err);
        }
    }
}


exports.db = new Controller();