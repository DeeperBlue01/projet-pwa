import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import MovieDetails from './MovieDetails';

const queryClient = new QueryClient();

const MovieList: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const handleMovieClick = (movie: any) => {
    setSelectedMovie(movie);
  };

  const handleReturnToList = () => {
    setSelectedMovie(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onReturn={handleReturnToList} />
      ) : (
        <Movie onMovieClick={handleMovieClick} />
      )}
    </QueryClientProvider>
  );
};

const Movie: React.FC<{ onMovieClick: (movie: any) => void }> = ({ onMovieClick }) => {
  const { data, isLoading, isError } = useQuery('movies', fetchMovies);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching movies</div>;
  }

  const filteredMovies = data.results.filter((movie: any) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 dark:bg-gray-800">
      <div className="p-12">
        <div>
          <div className="flex justify-end mb-4">
            <h1 className="text-3xl font-semibold mb-4 w-full ">🎬🍿 Movie library</h1>
            <input
              type="text"
              placeholder="🔎 Search for movie"
              value={searchTerm}
              onChange={handleSearch}
              className="border p-2 rounded-3xl h-12"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onMovieClick={onMovieClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MovieCard: React.FC<{ movie: { title: string; poster_path: string; id: number }; onMovieClick: (movie: any) => void }> = ({
  movie,
  onMovieClick,
}) => {
  return (
    <div
      className="transition-transform transform hover:scale-105 hover:cursor-pointer hover:shadow-2xl"
      onClick={() => onMovieClick(movie)}
    >
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title} Poster`} className="w-full h-full rounded-lg" />
    </div>
  );
};

const fetchMovies = async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/now_playing?api_key=601e53055f7f5b886626fb5aa39fbcc0'
  );
  const data = await response.json();
  return data;
};

export default MovieList;
