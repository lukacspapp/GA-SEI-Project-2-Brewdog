# SEI-Project-2-Brewdog 🍺


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
- Bulma
- Git/GitHub
- Axios

# Brewdog API
A web application where users can browse and find out various information about their favourite brewdog drink based on [Brewdog's Api](https://punkapi.com/documentation/v2)

### Welcome Page

<img src='https://i.imgur.com/vGySNjK.png'>

### Deployed version

https://search-and-play.netlify.app/

## Code Installation

https://github.com/lukacspapp/Project-2-Brewdog-Api

- Clone or download the repo
- Navigate to project-2-start folder
- Install yarn in Terminal by typing: <code>yarn</code>
- Start server with <code>yarn start</code>

## Planning


### Testing the API on Insomnia

We were pretty set on the Brewdog's Api as it was free to use and the infromation was quiet nested so it gave us a good opportunity to practice how to get to nested data.


<img src='https://i.imgur.com/GKzjGIK.png'>

The API returns data from 25 different beers including the name, alchol content, description, image, ingridients, brewing tips, food pairing information

We displayed 9 different types of data from the nested API that we displayed on the app



## Development

We decided to have a simple three-page application: Welcome Page(/), Index Page(/beers) and a View of a Single Page (beers/id).


### Welcome Page:

  The Welcome page is a really simple one as it can be seen here <img src='https://i.imgur.com/vGySNjK.png'>
  It has two buttons, the 'Discover Brewdog!' that will take you to the index page(/beers), and the 'Generate a random Brewdog! 
  that will take you to the view of a single beer page (beers/random).
  It also has a navbar that has two buttons one is our logo that we got from [Giphy](https://giphy.com/gifs/kochstrasse-hannover-agencylife-agenturleben-OZeWzZalgU5XNyHAqh)

### Index Page:
  
  <img src='https://i.imgur.com/vbF9gLB.png'>
  
  The index page which is in the BeerDisply component and returns the image, name , tagline and the first brewed time of the 25 beers. The page also has a filter that lets the user filter through the beers according to their ABV content. The filter is on the right handside of the navbar that is conditionally rendered. It is only visible when the user is on the Index page.

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
  
  The is a filter on this page which it executed by the <code>newBeers</code> function on a click event.
  
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
  
  ```
  {filteredBeers.length > 0 ?
      <div className='container' id='container'>
        <div className='tile is-ancestor is-flex-wrap-wrap is-flex-direction-row'>
          {filteredBeers.map(beer => {
            return (
              <div key={beer.id} className="tile is-3 is-parent">
                <Link className="tile is-child" id='background' to={`/beers/${beer.id}`}>
                  <div className="card-image">
                    <figure className="image is-3by5">
                      <img id='image' src={beer.image_url} alt={beer.name} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media-content">
                      <p className="title text">{beer.name}</p>
                      <br />
                      <p className="subtitle is-6 text">{beer.tagline}</p>
                    </div>
                    <div className="content subtitle is-6 text">
                      <br /><br />
                      <p>First brewed:<br /> <br />{beer.first_brewed}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
          }
        </div>
      </div >
      :
      <>
        <div className='container' id='container'>
          <div className='tile is-ancestor is-flex-wrap-wrap is-flex-direction-row'>
            {beers.map(beer => {
              return (
                <div key={beer.id} className="tile is-3 is-parent">
                  <Link className="tile is-child" id='background' to={`/beers/${beer.id}`}>
                    <div className="card-image">
                      <figure className="image is-3by5">
                        <img id='image' src={beer.image_url} alt={beer.name} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media-content">
                        <p className="title text">{beer.name}</p>
                        <br />
                        <p className="subtitle is-6 text">{beer.tagline}</p>
                      </div>
                      <div className="content subtitle is-6 text">
                        <br /><br />
                        <p>First brewed:<br /> <br />{beer.first_brewed}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div></>}
    <h2 className="title has-text-centered">
      {hasError ? 'Oh something went wrong, There are no beers to display 😞' : ' Beers are Loading...'}
      
```      
 
 


### View of a Single Beer Page:

The view of a single beer page is in the BeerInfo component and returns the image, name, description, ABV percentage, brewery tips, food pairing recommendations and the ingridients of the selected beer.
  
There is a randomly generated beer option is available from the home page as well which is handled in this component. It is a great feature of this API that you can make a request to <code>https://api.punkapi.com/v2/beers/random</code> and it will give us a all the data from a randomly generated beer. We added some error handling as some of the beers does not have an image. We have set the image_url to a state and if that array return null an error image appear next to the beer information.  
  
  <img src='https://media0.giphy.com/media/OZeWzZalgU5XNyHAqh/giphy.gif?cid=ecf05e479dcrrg6cpofgx2ylaxnii83syhpkiz1qscsso0t3&rid=giphy.gif&ct=g'>

```
  <div className='column is-half'>{url !== null ? <img src={beers.image_url}></img> : <img src={error}></img> }</div>
```

There is also some extra error handling in case the any of the api takes a bit more time to load or do not return anything back to the user

```
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
          
 ```         





### View of a Single Page:

- Search by Word in Album Name: https://itunes.apple.com/search?term=butterfly&attribute=albumTerm&media=music&entity=song&limit=200

### Prototypes with Miro

We decided to have a simple two-page app: Home Page (/) & Tracks Page (/tracks). The Tracks page would show all the results as an index until a user clicked on one of them. On click, the album index will skew, make space for the track and play it.

<img src="src/assets/home-page-miro.png" alt="home-page" width="300" /> <img src="src/assets/album-index-miro.png" alt="album-index" width="300" /> <img src="src/assets/artist-show-miro.png" alt="artist-show" width="300" />

## Development

### The Home Page

<img src="src/assets/home-page-site.png" alt="home-page-site"/>

The Home page along with the Search Bar make two common components of the app. On load, the homepage calls <code>componentDidMount</code> function using axios for the home page styling. The axios request <code>getAllSongs</code> is in the lib -> api.js file:

    export const getAllSongs = (term, attribute) => {
      if (attribute === 'Any') {
        return axios.get(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=200`)
      }
      else {
        return axios.get(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${term}&attribute=${attribute}&media=music&entity=song&limit=200`)
      }
    }

<em><code>cors-anywhere.herokuapp</code> was added after the deployed on Heroku so we are not blocked by CORS policy.</em>

The search bar is a child component of the Home Page. It collects the search team and attribute(such as 'All', 'songTerm', 'artistTerm' & 'albumTerm'). Once we hit enter, we pass these as props by adding them to URL of the Music Index Page.

    handleSubmit = (event) => {
      let term = this.state.search.term
      if (!term) {
        this.setState({ validate: false })
        return
      }
      let attribute = (this.state.search.attribute ? this.state.search.attribute : 'Any')
      this.props.history.push(`/tracks/${term}&${attribute}`)
    }

### Music Index Page

![Music Index](src/assets/album-index-gif.gif)

On loading, the Music Index Component retrieves the 'term' and 'attribute' values from the URL and adds them to the <code>getAllSongs</code> GET request:

    const urlDetails = this.props.location.pathname
        const term = urlDetails.split('/')[2].split('&')[0].replace(' ', '+')
        const attribute = urlDetails.split('/')[2].split('&')[1]


There are two events on the displayed album covers:

onMouseEnter: show the track and artist name in the NavBar
onMouseClick: Skew the index and show the artist details and play the song.

    handleClick = (event) => {
      this.setState({ isSkewedIndex: true })
      setTimeout(() => { this.setState({ singleArtist: event, isShowingArtist:  true, volume: 0.6 }) }, 500)
    }

We enable the page to show the track on the right side by using Boolean state values and conditional rendering.

    <div
    className={`container column
    ${this.state.isSkewedIndex ? 'slidingAnimation' :'slidingBackAnimation'}
    ${this.state.isShowingArtist ? 'not-hidden' : 'hidden'}`}>
        <MusicShow
        {...this.state.singleArtist}
        onClick={this.handleBackClick}
        volume={this.state.volume}/>
    </div>

### Artist Show Section:

On click, the index skews to left half of the page:

    .skew {
      transform: rotateY(55deg) skew(-13deg) scale(0.95);
      box-shadow: 4px 10px 36px -2px rgb(241, 240, 169);

      @media (max-width: 800px) {
        display: none;
      }
    }

and the Artist show section comes in with Sliding Animation:

    .slidingAnimation {
      animation: slide 1s ease;
      animation-fill-mode: forwards;
      background-image: linear-gradient(
        to right,
        rgba(247, 247, 247, 0),
        rgb(10, 10, 9)
      );
      right: -400px;
    }

    @keyframes slide {
      100% {
        right: 0px;
      }
    }

In this page, we use the React Audio Player as it's slightly better than HTML5 Audio player. We set it to 'autoplay' so the song begins playing as the page animates into this section:

    <ReactAudioPlayer autoPlay controls={true} src={props.previewUrl} volume={props.volume}/>

### Finishing Touches & Styling

In the last 4-5 hours, we focused on adding some finishing touches:

* Adding back button on the Music Index Page
* Styling the artist show section with flexbox
* Adding flashes to the music index. This was done by re-rendering the page on a timer and assigning <code>className="flash"</code> to random albums.
* Styling the Home Page

## Wins

Styling :sparkles: . Very pleased with how fun this app is, we learnt so much about animations, timers and using conditional rendering.

Teamwork :raised_hands: . This was the first time I pair-coded for almost 2 days and it was a wonderful experience. Rob and I were always in sync and found that bouncing personal ideas off each other always resulted in something better.

## Challenges

CORS :no_entry_sign: . While we were able to solve this easily after deployment, the why of it took me a while to fully understand. Our tutor was very helpful in explaining CORS in details.

### Bugs

Audio Volume: We set the audio volume as 0.6 as a starting point so its not too loud for the user. Due to this, it is not possible to change the volume of the track. We struggled to figure out if React Audio Player’s volume can be changed through state — so this will be a bug we need to solve in future.


## Key Learnings

* React.js: As this was my first React App, I learned a lot about conditional rendering, how state works and how to pass props using URLs.

* CSS Animations: Not only was this fun, but I feel very confident working with transitions and animations after this project.


## Future Improvements

* Make it Responsive
* Audio Fade in and out
```
