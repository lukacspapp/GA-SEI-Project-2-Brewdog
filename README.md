# SEI-Project-2-BrewDog 🍺


**_Timeframe_**

48 hours

## Goal:

A pair-coded programming hackathon to develop a React app using external APIs.

## Project Members:

Lukacs Papp - [<img src="https://i.stack.imgur.com/gVE0j.png" width='20px' alt="linkedin">](https://www.linkedin.com/in/lukacsjpapp/)    [<img src='https://media1.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif?cid=ecf05e47x2g034i9pzwtzzsd3xgg2w9nr94t4tflbbgo3008&rid=giphy.gif' width='20px'>](https://github.com/lukacspapp)

Piotr Jankowski - [<img src="https://i.stack.imgur.com/gVE0j.png" width='20px' alt="linkedin">](https://www.linkedin.com/in/piotr-jankowski2204/)    [<img src='https://media1.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif?cid=ecf05e47x2g034i9pzwtzzsd3xgg2w9nr94t4tflbbgo3008&rid=giphy.gif' width='20px'>](https://github.com/janek2204)

## Technologies Used

- Brewdog's API
- React.js
- JavaScript (ES6)
- HTML 5
- Bulma/ CSS
- Axios

# BrewDog API
A web application where users can browse and find out various information about their favourite BrewDog drink based on [Brewdog's Api](https://punkapi.com/documentation/v2).

### Welcome Page

<img src='https://i.imgur.com/vGySNjK.png'>

### Deployed version

https://github.com/lukacspapp/Project-2-Brewdog-Api

## Code Installation

- Clone or download the repo
- Navigate to project-2-start folder
- Install dependencies in Terminal by typing: <code>yarn</code> or <code>npm install</code> 
- Start server with <code>yarn start</code> or <code>npm start</code>

## Planning


### Testing the API on Insomnia

We were pretty set on the Brewdog's API as it was free to use and the information was quite nested so it gave us a good opportunity to practice how to get to nested data.


<img src='https://i.imgur.com/GKzjGIK.png'>

The API returns data from 25 different beers including the name, alcohol content, description, image, ingredients, brewing tips, food pairing information

We displayed 9 different types of data from the nested API that we displayed on the app.



## Development

We decided to have a simple three-page application: Welcome Page(/), Index Page(/beers), and a View of a Single Page (beers/id).

We did live-share on VS code for pair coding. We started off as Piotr coding and me guiding and then on the second day we switched.

The person who guided did the research and looked through study notes, whenever we hit a wall we both researched and tried solving the problem by trying out each and every code variation.


### Welcome Page:

  The Welcome Page is a really simple one as it can be seen here <img src='https://i.imgur.com/vGySNjK.png'>
  It has two buttons, the 'Discover Brewdog!' that will take you to the index page(/beers), and the 'Generate a random Brewdog! that will take you to the view of a single beer page (beers/random).
  It also has a navbar, that has two buttons one is the logo that we got from [Giphy](https://giphy.com/gifs/BrewDogOfficial-brewdog-punk-ipa-iE3lwBCEBdzA6HQJRo)
  which is displayed all the time on all pages and it always redirects the user back to the home page.
  
  The other button is the 🍺Brewdog API🍺  which is conditionally rendered that will take you to the beer index page(/beers). While you are on the index page(/beers) the button moves to the right-hand side of the navbar and once you have selected an individual beer it will move back to the right-hand side.
  
  ```
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
```



### Index Page:
  
  <img src='https://i.imgur.com/vbF9gLB.png'>
  
  The index page which is in the BeerDisply component and returns the image, name, tagline, and the first brewed time of the 25 beers. The page also has a filter that lets the user filter through the beers according to their ABV content. The filter is on the right-hand side of the navbar that is conditionally rendered. It is only visible when the user is on the Index page.

On load the index page triggers the <code>getData</code> function that makes the request to the API with axios and sets the data to a <code>useState</code>
  ```
  const [beers, setBeers] = useState([])
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://api.punkapi.com/v2/beers')
        setBeers(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [])
  
  ```
  As the function is in a <code>useEffect</code> the <code>getData</code> function gets called whenver there is change in the array of beers.
  
  The is a filter on this page that is executed by the <code>newBeers</code> function on a click event.
  
  <img src='https://i.imgur.com/QMiCsgm.png'>
  
  ```
  const handleClick = (event) => {
    const newBeers = beers.filter((beer) => {
      return beer.abv >= parseFloat(event.target.value) && beer.abv <= (parseFloat(event.target.value) + 2)
    })
    setFilteredBeers(newBeers)
  }
  ```
  
  There is also Error handling which is executed with a ternary operator. 
  For the full example ➡️ [Here](https://github.com/lukacspapp/SEI-Project-2-Brewdog/blob/main/Project-2-Brewery-master/project-2-start/src/componts/BeersDisplay.js)
 


### View of a Single Beer Page:

The view of a single beer page is in the BeerInfo component and returns the image, name, description, ABV percentage, brewery tips, food pairing recommendations, and the ingredients of the selected beer.
  
There is a randomly generated beer option is available from the home page as well which is handled in this component. It is a great feature of this API that you can make a request to <code>https://api.punkapi.com/v2/beers/random</code> and it will give us all the data from a randomly generated beer. We added some error handling as some of the beers do not have an image. We have set the image_url to a state and if that array return null an error image appears next to the beer information.  
  
  <img src='https://media0.giphy.com/media/OZeWzZalgU5XNyHAqh/giphy.gif?cid=ecf05e479dcrrg6cpofgx2ylaxnii83syhpkiz1qscsso0t3&rid=giphy.gif&ct=g'>

```
  <div className='column is-half'>{url !== null ? <img src={beers.image_url}></img> : <img src={error}></img> }</div>
```

There is also some extra error handling in case any of the API takes a bit more time to load or do not return anything back to the user

```
{beers ? : <h2 className="title has-text-centered">
              {hasError ? 'Oh something went wrong, There are no beers to display 😞' : ' Beers are Loading...'}
            </h2>
          }
          
 ```         

 The full example can be found ➡️ [Here](https://github.com/lukacspapp/SEI-Project-2-Brewdog/blob/main/Project-2-Brewery-master/project-2-start/src/componts/BeerInfo.js)

### Styling

For styling, we used a CSS framework [Bulma](https://bulma.io/). We used mainly Bulma's card components which I really like. I think it is easy to use and gives us a really nice, modern design.

## Wins

Filter  :raised_hands::    Filter was a real challenge that took us a great deal of time, loads of research, and team effort. We were very pleased that we were able to execute it in such a short period of time.

Teamwork :raised_hands::   This was the first time in my life I have ever pair-coded and it was a great experience. I and Piotr worked out great together. When I was coding he was researching, throwing ideas, and vice versa. It was really easy to work with him and we made a great team. We were able to figure out difficult tasks together such as the filtration of the beers.


## Challenges

Filter :no_entry_sign::    I think it was the biggest challenge for both of us.


Styling :no_entry_sign::   I Really love [Bulma](https://bulma.io/) but it was a real challenge to get used to the hundreds of divs I needed to use in order to execute a component


## Key Learnings

* React.js: As this was my first React App, I learned a lot about conditional rendering and how the state works.

* Bulma: This was my first time using a CSS framework I really enjoyed it and I love Bulma's design.




## Future Improvements

* Try to pass props to different components that will allow me to call the API less frequently and also fewer components


