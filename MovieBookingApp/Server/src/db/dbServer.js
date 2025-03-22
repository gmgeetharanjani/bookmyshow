const mongoose = require("mongoose");
const mongoose_url = process.env.MONGOOSE_URL;

const connectDB = ()=>{

    mongoose.connect(mongoose_url)
    .then(()=>{
        console.log("Connected to DB Succesfully")
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB;