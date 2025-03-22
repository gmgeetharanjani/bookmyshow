const mongoose = require("mongoose");


const theatreSchema = new mongoose.Schema({

    name:{
        type:String,
        requried:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    owner:  {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})


const TheatreModel = mongoose.model('theatre',theatreSchema);

module.exports = TheatreModel;