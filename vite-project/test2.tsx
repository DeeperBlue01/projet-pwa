import React, { useEffect, useState } from 'react';
import MovieDetails from './MovieDetails';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?api_key=601e53055f7f5b886626fb5aa39fbcc0'
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchMovies();
  }, []);


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePosterClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleReturnToList = () => {
    setSelectedMovie(null);
  };




  return (
    <div>
       <div className="flex justify-end mb-4">
       <h1 className="text-3xl font-semibold mb-4 w-full">🎬🍿 Movie library</h1>
        <input
          type="text"
          placeholder="🔎 Search for movie"
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 w-64 rounded-3xl"
        />
      </div>
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onReturn={handleReturnToList} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} 
            className="transition-transform transform hover:scale-105 hover:cursor-pointer hover:shadow-2xl"
            onClick={() => handlePosterClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
      </div>
  );
};

export default MovieList;
