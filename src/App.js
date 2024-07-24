// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Movies from './Movies';
import MovieForm from './MovieForm';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/create-movie" element={<MovieForm />} />
          <Route path="/edit-movie/:id" element={<MovieForm />} />
          <Route path="/" element={
            <div>
              <h1>Welcome to My App</h1>
              <a href="/signin">Sign In</a> | <a href="/signup">Sign Up</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
