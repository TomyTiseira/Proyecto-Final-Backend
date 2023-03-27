import React from 'react';
import logo2 from '../image/logo2.svg'
import CartWidget from './CartWidget';
import { NavLink } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";

const Navbar = () => {
  const {email} = useLoginContext();

  console.log(email, "navbar")
  return (
    <nav className='flex-container'>
      <NavLink to ='/'><img src={logo2} alt="Coffe Fe" width="60" height="60"/></NavLink>
      {email ? (
        <div>
          <NavLink to='/' className='nav-a'>Inicio</NavLink>
          <NavLink to='/products' className='nav-a'>Productos</NavLink>
          <NavLink to='/cart' className='nav-a'>Carrito</NavLink>
          <NavLink to='/logout' className='nav-a'>Logout</NavLink>
        </div>
      ) : (
        <div>
          <NavLink to='/' className='nav-a'>Inicio</NavLink>
          <NavLink to='/login' className='nav-a'>Login</NavLink>
          <NavLink to='/signup' className='nav-a'>Signup</NavLink>
        </div>
      )}
      <span>
        <CartWidget/>
      </span>
    </nav>
  );
}

export default Navbar;