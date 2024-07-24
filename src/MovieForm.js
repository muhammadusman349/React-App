// src/MovieForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moviesApi from './moviesApi';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',

    // Add other fields as needed
  });
  const { id } = useParams(); // Get movie ID from URL if updating
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        try {
          const response = await moviesApi.get(`movie/${id}/`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching movie:', error);
        }
      };

      fetchMovie();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing movie
        await moviesApi.put(`movie/${id}/`, formData);
      } else {
        // Create new movie
        await moviesApi.post('', formData);
      }
      navigate('/movies');
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Movie' : 'Create Movie'}</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Genre:</label>
        <textarea
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Year:</label>
        <textarea
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>
      {/* Add other fields as needed */}
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default MovieForm;
