import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home.jsx'
import CreateStudent from './pages/createStudent.jsx';
import ShowStudent from './pages/showStudent.jsx';
import EditStudent from './pages/editStudent.jsx';
import DeleteStudent from './pages/deleteStudent.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/students/create' element={<CreateStudent/>}/>
      <Route path='/students/details/:id' element={<ShowStudent/>}/>
      <Route path='/students/edit/:id' element={<EditStudent/>}/>
      <Route path='/students/delete/:id' element={<DeleteStudent/>}/>
    </Routes>
  )
}

export default App