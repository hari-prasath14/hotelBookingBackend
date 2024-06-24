import mongoose from "mongoose";

const hotelDetailsSchema =  mongoose.Schema({
    noOfSeats : {
        type : Number,
        required : true
    },
    roomName : {
        type : Number,
        required : true
    },
    amenities : {
        type : [String],
        required : true
    },
    rentPerHour :{
        type : Number,
        required : true

    },
},{ timestamps: true })


const hotelDetailsModel = mongoose.model('hotelDetailsModel',hotelDetailsSchema)

export default hotelDetailsModel


