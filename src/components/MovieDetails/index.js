import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const MovieDetails = ({apiKey}) => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
      )
      const data = await res.json()
      setMovie(data)
    }

    const fetchCast = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
      )
      const data = await res.json()
      setCast(data.cast || [])
    }

    fetchDetails()
    fetchCast()
  }, [id, apiKey])

  if (!movie) return <div>Loading...</div>

  return (
    <div className="details-page">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Duration:</strong> {movie.runtime} min
          </p>
          <p>
            <strong>Genre:</strong> {movie.genres.map(g => g.name).join(', ')}
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>{movie.overview}</p>
        </div>
      </div>

      <h3>Cast</h3>
      <div className="cast-grid">
        {cast.map(member => (
          <div key={member.cast_id} className="cast-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
              alt={member.name}
            />
            <p>
              <strong>{member.name}</strong>
            </p>
            <p>{member.character}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieDetails
