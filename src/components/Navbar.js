import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = ({ windowSize }) => {
  const history = useHistory();
  const logout = () =>{
    setIsPressed(false);
    localStorage.removeItem("userInfo");
    history.push('/');
  }
  const [isPressed,setIsPressed]=useState(false);
  const handleMenu = () =>{
    isPressed? setIsPressed(false) :setIsPressed(true);
  }
  
  return (
    <div>
      <div className='navbar'>
        {/*LOGO*/}
        <Link to="/home" style={{ textDecoration:'none' }}><h1 id='navbar-title'>{"<Sajad/>"}</h1></Link>

        {/*NAVBAR LINKS*/}
        {windowSize > 750 ?
          //LAPTOP DISPLAY OF NAVBAR
          <ul className='navbar-links'>
            <Link to="/home" style={{ textDecoration:'none' }}><li className='navbar-item'>Home</li></Link>
            <Link to="/create" style={{ textDecoration:'none' }}><li className='navbar-item'>Create Post</li></Link>
            <Link to="/posts" style={{ textDecoration:'none' }}><li className='navbar-item'>My Posts</li></Link>
            <Link to="/#" style={{ textDecoration:'none' }}><li id='logout-button' onClick={logout}>Logout</li></Link>
          </ul>

          : //TABLET/MOBILE DISPLAY
          <>
            <GiHamburgerMenu id='navbar-button'size={35} onClick={handleMenu}/>
            
          </>
          
        }
      
      </div>
      {/*BURGER MENU */}
      {isPressed && (
        <ul className='menu-bar-container'>
          <Link to="/home" style={{ textDecoration:'none' }}><li className='navbar-item' style={{listStyle:"none",marginBottom:"10px"}}>Home</li></Link>
          <Link to="/create" style={{ textDecoration:'none' }}><li className='navbar-item' style={{listStyle:"none",marginBottom:"10px"}}>Create Post</li></Link>
          <Link to="/posts" style={{ textDecoration:'none' }} ><li className='navbar-item' style={{listStyle:"none",marginBottom:"10px"}}>My Posts</li></Link>
          <Link to="/#" style={{ textDecoration:'none' }}><li id='logout-button' style={{listStyle:"none"}} onClick={logout}>Logout</li></Link>
        </ul>
      )}
    </div>
    
    
    
  )
}

export default Navbar