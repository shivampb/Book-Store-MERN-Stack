import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import axios from 'axios';
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import Home from './pages/Home';
import ShowBooks from "./pages/ShowBooks";

const App = () => {

  // //Axios METHODS
  // axios.get('http://localhost:5555/books')
  //   .then(response => {
  //     console.log('Data:', response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBooks />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />


    </Routes>
  )
}

export default App
