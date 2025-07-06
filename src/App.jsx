import { useEffect, useRef } from 'react';
import { useMovies } from './moviesContext';
import './index.css';

function App() {
  const {
    query,
    shows,
    setQuery,
    selectedMovies,
    loading,
    error,
    isDropdownOpen,
    setIsDropdownOpen,
    handleSelectShow,
    handleDeleteMovie,
    handleShowDetails,
  } = useMovies();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='w-full bg-gray-100 flex flex-col items-center p-4'>
      <div className='w-full max-w-2xl fixed top-0 left-0 right-0 mx-auto mt-4'>
        <h1 className='text-3xl font-bold text-blue-600 text-center mb-4'>
          Search any TV show / movie
        </h1>
        <form className='relative'>
          <div className='flex gap-2'>
            <input
              id='textInput'
              type='text'
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='Search for a TV show...'
              className='w-full p-2 rounded-lg border border-gray-300'
            />
            <button
              onClick={e => {
                e.preventDefault();
                setQuery('');
              }}
              className='px-4 py-2 bg-blue-500 text-white'
              disabled={loading}>
              Clear
            </button>
          </div>

          {isDropdownOpen && shows.length > 0 && (
            <ul
              ref={dropdownRef}
              className='absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto'>
              {shows.map(({ show }) => (
                <li
                  key={show.id}
                  className='px-4 py-2 hover:bg-blue-100 cursor-pointer'
                  onClick={() => handleSelectShow(show)}>
                  {show.name}{' '}
                  {show.ended && `- ${show.ended?.split('-')[0] || ''}`}
                </li>
              ))}
            </ul>
          )}
        </form>
        {error && <p className='text-red-500 mt-2 text-center'>{error}</p>}
        <h4 className='text-xl font-semibold mb-8 mt-8 text-center'>
          {selectedMovies?.length > 0
            ? 'Selected Movies / Shows'
            : 'Nothing selected !'}
        </h4>
        <div className='w-full mt-10 overflow-y-auto max-h-80'>
          <div className='flex flex-col gap-3'>
            {selectedMovies.length > 0
              ? selectedMovies.map(movie => (
                  <div
                    key={movie.id}
                    className='w-full bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-between gap-4 p-4 hover:bg-blue-200'>
                    <img
                      onClick={e => handleShowDetails(e, movie)}
                      src={movie.image?.medium || ''}
                      alt={movie.name}
                      className='w-16 h-16 object-cover rounded'
                    />
                    <div onClick={e => handleShowDetails(e, movie)}>
                      <h3 className='text-lg font-semibold'>{movie.name}</h3>
                      <p className='text-sm text-gray-500'>
                        {movie.genres?.join(', ')}
                      </p>
                      <p className='text-sm text-gray-600'>
                        Rating: {movie.rating?.average || 'N/A'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className='text-red-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
