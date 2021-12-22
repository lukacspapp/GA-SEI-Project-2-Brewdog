import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import error from '../styles/output-onlinegiftools.gif'


const BeerInfo = () => {
  const [food, setFood] = useState([])
  const [beers, setBeers] = useState(null)
  const [yeast, setyeast] = useState()
  const [malt, setMalt] = useState([])
  const [hops, setHops] = useState([])
  const [url,setUrl] = useState()
  const [hasError, setHasError] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://api.punkapi.com/v2/beers/${id}`)
        setBeers(data[0])
        setFood(data[0].food_pairing)
        setyeast(data[0].ingredients.yeast)
        setMalt(data[0].ingredients.malt)
        setHops(data[0].ingredients.hops)
        setUrl(data[0].image_url)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [id])

  return (
    <>
      <Navbar />

      <div className='section'>
        <div className='container'>
          {beers ? <div>
            <div className='title has-text-centered'> <h1>{beers.name}</h1></div><hr /><div className='columns'>
              <div className='column is-half'>{url !== null ? <img src={beers.image_url}></img> : <img src={error}></img> }</div>
              <div className='column is-half'>
                <h1 className='title is-5'>Description:</h1>
                <br />
                <h1 className='subtitle is-6'>{beers.description}</h1>
                <hr />
                <br />
                <h1 className='title is-5'>ABV:</h1>
                <h1 className='subtitle is-6'>{beers.abv}%</h1>
                <hr />
                <br />
                <h1 className='title is-5'>Brewery tips :</h1>
                <br />
                <h1 className='subtitle is-6'>{beers.brewers_tips}</h1>
                <hr />
                <br></br>
                <div>
                  <h1 className='title is-5'>Food paring:</h1>
                  <braces />
                  {food.map(item => {
                    return (
                      <li className='subtitle is-6' key={beers.id}>{item}</li>)
                  })}
                  <hr />
                </div>
                <br />
                <div>
                  <h1 className='title is-5'>Malt:</h1>
                  {malt.map(item => {
                    return (
                      <a className='subtitle is-6' key={beers.id}>{item.name},</a>)
                  })}
                  <br />
                  <br></br>
                  <h1 h1 className='title is-5'>Hops:</h1>
                  {hops.map(item => {
                    return (
                      <a className='subtitle is-6' key={beers.id}>{item.name},</a>)
                  })}
                  <hr />
                  <h1 className='title is-5'>Yeast:</h1>
                  <h1 className='subtitle is-6'>{yeast}</h1>
                </div>
              </div>
            </div>
          </div>
            :
            <h2 className="title has-text-centered">
              {hasError ? 'Oh something went wrong, There are no beers to display 😞' : ' Beers are Loading...'}
            </h2>
          }

        </div>
      </div>
    </>
  )
}

export default BeerInfo