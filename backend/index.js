import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js"
import bookRoutes from "./routes/book.route.js"
import cors from "cors"
dotenv.config()

const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())

app.use("/api/books",bookRoutes)

const PORT=process.env.PORT || 5000

app.listen(PORT,(req,res)=>{
    connectDB()
    console.log(`server is running on port ${PORT}`)
})