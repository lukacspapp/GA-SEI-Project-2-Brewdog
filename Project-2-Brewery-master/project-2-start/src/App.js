import React from 'react'
import Home from './componts/Home'
import BeersDisply from './componts/BeersDisplay'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import BeerInfo from './componts/BeerInfo'



const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/beers' component={BeersDisply}/>
        <Route exact path='/beers/:id' component={BeerInfo}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App


