import React, { useEffect } from 'react'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import { useBookStore } from './store/book.store.js'

const App = () => {
  const {getBooks}=useBookStore()

  useEffect(()=>{
    getBooks()
  },[getBooks])

  return (
    <>
      <h1 className='text-4xl font-bold text-center mt-8'>BookNerd Haven</h1>
      <BookForm/>
      <BookList/>
    </>
  )
}

export default App