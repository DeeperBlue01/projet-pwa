import React from 'react';
import { useQuery } from 'react-query';
import {Link, useParams} from 'react-router-dom';




const fetchMovieDetails = async (movieId: string) => {
  const mykey = '601e53055f7f5b886626fb5aa39fbcc0';

  const [creditsResponse, imagesResponse, movieDetailsResponse] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${mykey}`),
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${mykey}`),
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${mykey}`),
  ]);

  const creditsData = await creditsResponse.json();
  const imagesData = await imagesResponse.json();
  const movieDetailsData = await movieDetailsResponse.json();

  const allImages = imagesData.backdrops;

  return {
    credits: creditsData,
    images: allImages,
    backgroundImage: allImages.length > 0 ? `url(https://image.tmdb.org/t/p/original${allImages[0].file_path})` : undefined,
    title: movieDetailsData.title,
    overview: movieDetailsData.overview,
    genre: movieDetailsData.genres.map((genre: any) => genre.name).join(', '),
    releaseDate: movieDetailsData.release_date,
    poster_path: movieDetailsData.poster_path,
  };
};

const MovieDetails: React.FC = () => {
  const {id} = useParams<{id : string}>()
  const { data: movieDetails } = useQuery(['movieDetails', id], () => fetchMovieDetails(id!));

  const mainActors = movieDetails?.credits.cast?.filter((actor: any) => actor.order <= 10);
  const dateUs = (date: string) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <div className="min-h-screen min-w-screen">
      <div
        style={{
          backgroundImage: movieDetails?.backgroundImage,
          backgroundSize: '130% 100%',
        }}
        className="inset-0 flex flex-col sm:flex-row items-start"
      >
        <div className="p-6 backdrop-blur-lg bg-slate-800/40">
        <Link to = "/"
          className="mt-4 ml-4 text-white px-4 py-2 mb-2 rounded bg-transparent"
        >
          ← Back
        </Link>
        <div className="p-8 flex items-end">
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetails?.poster_path}`}
            alt={movieDetails?.title}
            className="mr-8 rounded"
            style={{ width: 300, height: 450 }}
          />
          <div>
            <h1 className="font-sans text-4xl mb-2">{movieDetails?.title}</h1>
            <p className="text-lg font-sans	mb-2">{movieDetails?.overview}</p>
            <div className="flex flex-col">
              <p className="text-lg mr-4">
                {movieDetails?.genre}
              </p>
              <p className="text-lg">
              {dateUs(movieDetails?.releaseDate)}
              </p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <h2 className="font-sans text-2xl">Credits</h2>
          <div className="flex flex-row overflow-x-auto">
            {mainActors?.map((actor: any) => (
              <div key={actor.id} className="flex-shrink-0 mr-4">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded"
                  style={{ width: 200, height: 300 }}
                />
                <p className="font-sans mt-2">
                  {actor.name}
                  <br />
                  <span className="font-sans text-sm">{actor.character}</span>
                </p>
              </div>
            ))}
          </div>
          <h2 className="text-2xl">Images</h2>
          <div className="flex flex-row overflow-x-auto mt-4">
            {movieDetails?.images.map((image: any) => (
              <div key={image.file_path} className="flex-shrink-0 mr-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={movieDetails.title}
                  className="rounded"
                  style={{ width: 500, height: 281 }}
                />
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

const fetchMovieById = async (id : string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=601e53055f7f5b886626fb5aa39fbcc0`
  );
  const data = await response.json();
  return data;
};

export default MovieDetails;
