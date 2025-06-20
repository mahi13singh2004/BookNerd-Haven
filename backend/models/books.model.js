import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
    }
},
{timestamps:true}
)

const Book=mongoose.model("Book",bookSchema)
export default Book