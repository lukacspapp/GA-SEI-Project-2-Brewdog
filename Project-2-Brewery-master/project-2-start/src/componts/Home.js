import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
const Home = () => {
  return (
    <><Navbar /><div className='imag'>
      <section className='hero is-fullheight-with-navbar'>
        <div className="hero-body">
          <div className='container'>
            <Link to='/beers'><button className='button is-link is-fullwidth is-rounded'>Discover Brewdog!</button></Link>
            <div className='image2'></div>
            <Link to='/beers/random'><button className='button is-danger is-fullwidth is-rounded'>Generate a random Brewdog!</button></Link>
          </div>
        </div>
      </section>
    </div></>

  )
}


export default Home