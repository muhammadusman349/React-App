// src/Movies.js
import React, { useEffect, useState } from 'react';
import moviesApi from './moviesApi';

import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await moviesApi.get('');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await moviesApi.delete(`movie/${id}/`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div>
      <h2>Movies</h2>
      <Link to="/create-movie">Create New Movie</Link>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.id}
            {movie.title}
            {movie.genre}
            {movie.year}
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
            <Link to={`/edit-movie/${movie.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
