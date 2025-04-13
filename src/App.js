import {useState} from 'react'
import {Switch, Route, useHistory} from 'react-router-dom'
import Navbar from './components/Navbar'
import MoviesGrid from './components/MoviesGrid'
import MovieDetails from './components/MovieDetails'

import './App.css'

const API_KEY = '8cfaa90ca0db0a288492e975e22e1424'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const history = useHistory()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      history.push(`/search/${searchQuery}`)
    }
  }

  return (
    <div className="app">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MoviesGrid
              type="popular"
              apiUrl={`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`}
            />
          )}
        />
        <Route
          path="/top-rated"
          render={() => (
            <MoviesGrid
              type="top_rated"
              apiUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`}
            />
          )}
        />
        <Route
          path="/upcoming"
          render={() => (
            <MoviesGrid
              type="upcoming"
              apiUrl={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`}
            />
          )}
        />
        <Route
          path="/movie/:id"
          render={props => <MovieDetails {...props} apiKey={API_KEY} />}
        />
        <Route
          path="/search/:query"
          render={props => (
            <MoviesGrid {...props} type="search" apiKey={API_KEY} />
          )}
        />
      </Switch>
    </div>
  )
}

export default App
