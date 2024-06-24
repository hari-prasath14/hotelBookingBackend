import mongoose from "mongoose";

const RoomBookingSchema = mongoose.Schema({
    CustomerName :{
        type : String,
        required : true
    },
    date :{
        type : String,
        required : true
    },
    StartTime :{
        type : String,
        required : true
    },
    EndTime :{
        type : String,
        required : true
    },
    RoomId : {
        type : mongoose.Types.ObjectId,
        ref : 'hotelDetailsModel',
        required :true
    },
    Status :{
        type : String,
    },
},{ timestamps: true })


const RoomBooking = mongoose.model('RoomBookingModel',RoomBookingSchema)
export default RoomBooking