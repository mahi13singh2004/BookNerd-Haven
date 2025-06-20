import Book from "../models/books.model.js"

export const getBooks=async(req,res)=>{
    try {
        const books=await Book.find()
        return res.status(200).json({
            message:"Books found",
            books
        })
    } 
    catch (error) {
        console.log("Unable to fetch books",error)
        return res.status(500).json({message:"Internal Server Error"})    
    }
}

export const createBook=async(req,res)=>{
    try {
        const {author,title,status}=req.body
        if(!author || !title){
            return res.status(400).json({message:"All fields are required"})
        }
        const book=await Book.create({author,title,status})
        return res.status(201).json({
            message:"Book created",
            book
        })
    } 
    catch (error) {
        console.log("Unable to create book",error)
        return res.status(500).json({message:"Internal Server Error"})    
    }
}

export const updateBook=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,author,status}=req.body
        const updatedBook=await Book.findByIdAndUpdate(id,{title,author,status},{new:true})
        return res.status(200).json({
            message:"Book Updated",
            updatedBook
        })
    } 
    catch (error) {
        console.log("Unable to update book",error)
        return res.status(500).json({message:"Internal Server Error"})    
    }
}

export const deleteBook=async(req,res)=>{
    try {
        const {id}=req.params
        await Book.findByIdAndDelete(id)
        return res.status(200).json({
            message:"Book deleted"
        })
    } 
    catch (error) {
        console.log("Unable to delete book",error)
        return res.status(500).json({message:"Internal Server Error"})    
    }
}