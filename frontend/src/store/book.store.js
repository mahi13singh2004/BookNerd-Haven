import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials=true

export const useBookStore=create((set,get)=>({
    books:[],
    loading:false,
    
    getBooks:async()=>{
        set({loading:true})
        try {
            const res=await axios.get("http://localhost:5000/api/books")
            set({books:res.data.books})
        } 
        catch (error) {
            console.log("Failed to fetch",error)
        }
        finally{
            set({loading:false})
        }
    },

    createBook:async(title,author,status)=>{
        set({loading:true})
        try {
            await axios.post("http://localhost:5000/api/books",{author,title,status})
            get().getBooks()
        } 
        catch (error) {
            console.log("Failed to created",error)
        }
        finally{
            set({loading:false})
        }
    },

    updateBook:async(id,updation)=>{
        set({loading:true})
        try {
            await axios.put(`http://localhost:5000/api/books/${id}`,updation)
            await get().getBooks()
        } 
        catch (error) {
            console.log("Failed to update",error)
        }
        finally{
            set({loading:false})
        }
    },

    toggleStatus: async (book) => {
        const newStatus = book.status === "pending" ? "completed" : "pending";
        try {
          await axios.put(`http://localhost:5000/api/books/${book._id}`, {
            title: book.title,
            author: book.author,
            status: newStatus,
          });
          await get().getBooks();
        } catch (error) {
          console.error("Failed to toggle status", error);
        }
      },
      

    deleteBook:async(id)=>{
        set({loading:true})
        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`)
            await get().getBooks()
        } 
        catch (error) {
            console.log("Failed to delete",error)
        }
        finally{
            set({loading:false})
        }
    },
}))