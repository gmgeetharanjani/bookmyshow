const mongoose = require("mongoose");


const showSchema = new mongoose.Schema({

    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'movie',
        required:true
    },
    theatre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'theatre',
        required:true
    },
    showDate:{
        type:Date,
        required:true
    },
    showTime:{
        type:String,
        required:true
    },
    totalSeats:{
        type:Number,
        required:true
    },
    bookedSeats:{
        type:Array,
        default:[]
    },
    ticketPrice:{
        type:Number,
        default:100,
        required:true
    }
})


const ShowModel = mongoose.model("shows", showSchema);


module.exports = ShowModel;