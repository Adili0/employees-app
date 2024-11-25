import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Correct import
import './App.css';
import Header from './Components/Admin/Header';
import Home from './Components/Admin/Home';
import Login from './Login';
import Dashboard from './Components/Admin/Dashboard';
import Createemp from './Components/Admin/Createemp';
import EmployeeList from './Components/Admin/EmployeeList';
import Edit from './Components/Admin/Edit';

const App = () => {
  return (
    <>

      <BrowserRouter> {/* Correct component */}
        <Routes>
          <Route element={<Header />} />
          <Route path='home' element={<Home/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='dashoard' element={<Dashboard/>}/>
          <Route path='/createemp' element={<Createemp/>}/>
          <Route path='employelist' element={<EmployeeList/>}/>
          <Route path='edit' element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
