import React from 'react';
import {  Route, Routes, } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Student from './components/Student';
import StudentCreate from './components/StudentCreate';
import StudentEdit from './components/StudentEdit';

function App() {
  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/students" element={<Student/>} />
          <Route path="/students/create" element={<StudentCreate/>} />
          <Route path="/students/:id/edit" element={<StudentEdit/>} />
        </Routes>
    </div>

      
  );
}

export default App;
