const mongoose = require("mongoose");

const connectDB = ()=>{

    mongoose.connect("mongodb+srv://root:rootUser@mycluster.fmxnp.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster")
    .then(()=>{
        console.log("Connected to DB Succesfully")
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB;