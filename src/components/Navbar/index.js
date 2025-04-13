import {Link} from 'react-router-dom'

const Navbar = ({searchQuery, setSearchQuery, handleSearch}) => (
  <nav className="navbar">
    <h2 className="logo">
      <Link to="/">movieDB</Link>
    </h2>
    <div className="nav-links">
      <Link to="/">Popular</Link>
      <Link to="/top-rated">Top Rated</Link>
      <Link to="/upcoming">Upcoming</Link>
    </div>
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  </nav>
)

export default Navbar
