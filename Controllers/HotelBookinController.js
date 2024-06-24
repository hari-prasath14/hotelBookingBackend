import hotelDetails from "../Models/HotelDetailsSchema.js";
import RoomBooking from "../Models/RoomBookingSchema.js";

export const createARoom = async(req,res) =>{
    try 
    {
        const {noOfSeats,amenities,rentPerHour,roomName} =  req.body

       if (!noOfSeats || !amenities || !rentPerHour) {
            return res.status(400).send({ message: 'Missing required fields' });
        }

        const room = new hotelDetails({
            noOfSeats,
            roomName,
            amenities,
            rentPerHour
        });
        res.status(200).send({room,message:'created successfully'})
                
    } 
    catch (error) {
        console.log('createARoom',error);
        res.status(200).send({message:'error in creating room'})

    }
}

export const bookingRoom = async (req, res) => {
    try {
        const { CustomerName, date, StartTime, EndTime, RoomId } = req.body;

        if (!CustomerName || !date || !StartTime || !EndTime || !RoomId) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const bookingDate = new Date(date);
        const startTime = new Date(`${date}T${StartTime}`);
        const endTime = new Date(`${date}T${EndTime}`);


        const existingBookings = await RoomBooking.find({
            RoomId,
            date: bookingDate,
            $or: [
                { StartTime: { $lt: endTime, $gt: startTime } }, 
                { EndTime: { $gt: startTime, $lt: endTime } },   
                { StartTime: { $lte: startTime }, EndTime: { $gte: endTime } } 
               ]
        });

        if (existingBookings.length > 0) {
            return res.status(400).send({ message: 'Room is not available for the requested time' });
        }

        const newBooking = new RoomBooking({
            CustomerName,
            date: bookingDate,
            StartTime: startTime,
            EndTime: endTime,
            Status:'Booked',
            RoomId
        });

        await newBooking.save();

        res.status(201).send({ message: 'Room booked successfully', booking: newBooking });

    } catch (error) {
        console.log('Room booking', error);
        res.status(500).send({ message: 'Error in booking room' });
    }
};

export const allRoomsList = async(req,res)=>{
    try 
    {
        const existingBookings = await RoomBooking.find().select('-__v -_id').populate('RoomId','-_id roomName')
        res.status(200).send(existingBookings);
        
    } 
    catch (error) 
    {
        console.log('Room list', error);
        res.status(500).send({ message: 'Error in room list' });
    }
}
export const allCustomers = async(req,res)=>{
    try 
    {
        const allCustomerData = await RoomBooking.find().select('-__v -_id').populate('RoomId','-_id roomName')
        res.status(200).send(allCustomerData);
        
    } 
    catch (error) 
    {
        console.log('Room list', error);
        res.status(500).send({ message: 'Error in room list' });
    }
}

export const getCustomerBookings = async (req, res) => {
    try {
        const bookings = await RoomBooking.find()
            .populate('RoomId', 'roomName') 
            .select('CustomerName RoomId date StartTime EndTime Status createdAt') 
           
            

        const customerBookings = bookings.reduce((acc, booking) => {
            const { CustomerName, RoomId, date, StartTime, EndTime, Status, _id, createdAt } = booking;
            const roomName = RoomId.roomName;


            const existingCustomer = acc.find(
                (item) => item.customerName === CustomerName && item.roomName === roomName
            );

            const formattedBookingDate = new Date(createdAt).toLocaleString(); 

            const bookingDetails = {
                bookingId: _id,
                date,
                startTime: StartTime,
                endTime: EndTime,
                status: Status,
                bookingDate: formattedBookingDate,
            };

            if (existingCustomer) {
                existingCustomer.bookings.push(bookingDetails);
                existingCustomer.bookingCount += 1;
            } 
            
            else {
                acc.push({
                    customerName: CustomerName,
                    roomName: roomName,
                    bookings: [bookingDetails],
                    bookingCount: 1,
                });
            }

            return acc;
        }, []);

        res.status(200).send(customerBookings);

    } catch (error) {
        console.log('getCustomerBookings', error);
        res.status(500).send({ message: 'Error fetching customer bookings' });
    }
};