import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './header.css';

const Header = () => {
  return (
    <>
      <h1>Logo</h1>
      <div className="header">
        <NavLink to="/home" className="Navlink">Home</NavLink>
        <NavLink to="/employelist" className="Navlink">Employee List</NavLink>
        <NavLink to="" className="Navlink">Hukum Gupta-</NavLink>
        <NavLink to="/" className="Navlink">Logout</NavLink>
        
      </div>
    </>
  );
};

export default Header;
