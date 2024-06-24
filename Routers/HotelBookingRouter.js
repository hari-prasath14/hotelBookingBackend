import express from 'express';
import { createARoom,bookingRoom,allRoomsList, allCustomers, getCustomerBookings } from '../Controllers/HotelBookinController.js';

const router = express.Router()

router.post('/createroom',createARoom)
router.post('/bookroom',bookingRoom)
router.get('/bookedrooms',allRoomsList)
router.get('/customersbookedroom',allCustomers)
router.get('/alldetails',getCustomerBookings)


export default router