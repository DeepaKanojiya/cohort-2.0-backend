const mongoose = require("mongoose");

const connectToDb = ()=>{
    mongoose.connect(process.env.Mongo_URI).then(()=>{
        console.log("database connected to DB")
    })
}


module.exports = connectToDb;
