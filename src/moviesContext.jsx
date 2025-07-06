import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setShows([]);
      setIsDropdownOpen(false);
      return;
    }

    const fetchShows = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
        );
        if (!response.ok) throw new Error('Failed to fetch shows');
        const data = await response.json();
        setShows(data);
        if (!isDropdownOpen && !selectedMovies.find(i => i.name === query)) {
          setIsDropdownOpen(true);
        }
      } catch (err) {
        setError(err.message);
        setIsDropdownOpen(false);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchShows, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelectShow = useCallback(
    show => {
      if (!selectedMovies.some(movie => movie.id === show.id)) {
        setSelectedMovies([...selectedMovies, show]);
      }
      setQuery('');
      setIsDropdownOpen(false);
    },
    [selectedMovies],
  );

  const handleDeleteMovie = useCallback(
    id => {
      setSelectedMovies(selectedMovies.filter(movie => movie.id !== id));
    },
    [selectedMovies],
  );

  const handleShowDetails = useCallback(
    (e, movie) => {
      e.preventDefault();
      navigate(`/details/${movie.id}`);
    },
    [navigate],
  );

  const state = {
    query,
    setQuery,
    shows,
    setShows,
    dropdownShows: shows,
    selectedMovies,
    setSelectedMovies,
    loading,
    error,
    isDropdownOpen,
    setIsDropdownOpen,
    handleSelectShow,
    handleDeleteMovie,
    handleShowDetails,
  };

  return (
    <MoviesContext.Provider value={state}>{children}</MoviesContext.Provider>
  );
}

export const useMovies = () => useContext(MoviesContext);
