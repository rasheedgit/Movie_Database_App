import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'

const MoviesGrid = ({apiUrl, type, apiKey}) => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const {query} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      let url = apiUrl

      if (type === 'search') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}`
      } else {
        url = `${apiUrl}&page=${page}`
      }

      const res = await fetch(url)
      const data = await res.json()
      setMovies(data.results || [])
    }

    fetchData()
  }, [apiUrl, type, query, apiKey, page])

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1)
  }

  const handleNext = () => {
    setPage(prev => prev + 1)
  }

  return (
    <>
      <div className="grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
            <Link to={`/movie/${movie.id}`}>
              <button type="button">View Details</button>
            </Link>
          </div>
        ))}
      </div>

      {type !== 'search' && (
        <div className="pagination">
          <button type="button" onClick={handlePrev} disabled={page === 1}>
            Prev
          </button>
          <span>{page}</span>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default MoviesGrid
