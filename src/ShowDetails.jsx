import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMovies } from './moviesContext';

function ShowDetails() {
  const { id } = useParams();
  const { selectedMovies, handleDeleteMovie } = useMovies();
  const movie = selectedMovies.find(i => i.id == id) || {};
  const navigate = useNavigate();

  const handleDelete = (e, id) => {
    e.preventDefault();
    navigate('/');
    handleDeleteMovie(id);
  };

  if (!movie) {
    return (
      <div className='w-full bg-gray-100 flex items-center justify-center p-4 min-h-screen'>
        <p className='text-gray-500'>Movie not found</p>
      </div>
    );
  }

  return (
    <div className='w-full bg-gray-100 p-4'>
      <div className='w-full rounded-lg shadow-lg p-8 border border-gray-200'>
        <h1 className='text-3xl font-bold mb-6 text-gray-900'>{movie.name}</h1>
        <img
          src={movie.image?.medium}
          alt={movie.name}
          className='w-70 h-70 object-cover rounded-xl mb-6'
        />
        <p className='text-xl mb-4'>
          <strong className='text-gray-700'>Rating:</strong>{' '}
          {movie.rating?.average || 'N/A'}
        </p>
        <p className='text-xl mb-4'>
          <strong className='text-gray-700'>Genres:</strong>{' '}
          {movie.genres?.join(', ') || 'N/A'}
        </p>
        <p className='text-xl mb-4'>
          <strong className='text-gray-700'>Status:</strong>{' '}
          {movie.status || 'N/A'}
        </p>
        <p className='text-xl mb-4'>
          <strong className='text-gray-700'>Summary:</strong>{' '}
          {movie.summary
            ? movie.summary.replace(/<[^>]+>/g, '')
            : 'No summary available'}
        </p>
      </div>
      <div className='absolute top-20 right-40'>
        <Link to='/' className='px-6 py-3 bg-blue-500 text-white rounded-lg'>
          Back to Home
        </Link>
        <button
          onClick={e => handleDelete(e, movie.id)}
          className='px-6 py-3 bg-blue-500 text-white rounded-lg ml-5'>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ShowDetails;
