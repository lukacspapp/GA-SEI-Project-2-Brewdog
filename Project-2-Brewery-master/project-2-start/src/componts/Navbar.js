import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../styles/giphy background .gif'





const Navbar = () => {

  return (
    <nav className='navbar is-flex-direction-row is-justify-content-space-between is-black'>
      <div className="navbar-item" href="">
        <figure className="image">
          <Link to='/'><img src={logo} /></Link>
        </figure>
      </div>
      <div className='nabar-item'></div>
      <div className='navbar-item'>
        <Link className='text' to='/beers'>🍻 Brewdog API 🍻</Link>
      </div>
    </nav >
  )
}

export default Navbar



