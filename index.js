import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './Config/DBconnection.js'
import cors from 'cors'
import HotelBookingRouter from './Routers/HotelBookingRouter.js'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())
const PORT = process.env.port

app.use('/api/booking',HotelBookingRouter)


app.listen(PORT,()=>{
    console.log('running in port',PORT)
})
connectDB()
