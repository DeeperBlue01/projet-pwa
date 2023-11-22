import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const MovieList: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Movie />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

const Movie: React.FC = () => {
  const { data, isLoading, isError } = useQuery('movies', fetchMovies);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching movies</div>;
  }

  return (
    <div>
       <div className="flex justify-end mb-4">
       <h1 className="text-3xl font-semibold mb-4 w-full">🎬🍿 Movie library</h1>

      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    
    </div>
    </div>
  );
};

const MovieCard: React.FC<{ movie: { title: string; poster_path: string } }> = ({ movie }) => {
  return (
    <div className="transition-transform transform hover:scale-105 hover:cursor-pointer hover:shadow-2xl">
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
      alt={`${movie.title} Poster`} 
      className="w-full h-full rounded-lg"/>
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
