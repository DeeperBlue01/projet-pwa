import React, { useEffect, useState } from 'react';

interface MovieDetailsProps {
  movie: any;
  onReturn: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onReturn }) => {
  const [credits, setCredits] = useState<any>({});
  const [images, setImages] = useState<any[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const apiKey = '71ff4efa260fe7786fad72f69a37b9dd';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
        );
        const data = await response.json();
        setCredits(data);
      } catch (error) {
        console.error('Error fetching credits data:', error);
      }
    };

    const fetchImages = async () => {
      try {
        const apiKey = '601e53055f7f5b886626fb5aa39fbcc0';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${apiKey}`
        );
        const data = await response.json();
        // Sélectionner toutes les images
        const allImages = data.backdrops;
        setImages(allImages);
          // Utiliser la première image de la liste des backdrops comme image de fond
          if (allImages.length > 0) {
            setBackgroundImage(`url(https://image.tmdb.org/t/p/original${allImages[0].file_path})`);
          }
      } catch (error) {
        console.error('Error fetching images data:', error);
      }
    };

    fetchCredits();
    fetchImages();
  }, [movie.id]);

  // Afficher les détails du film (description, acteurs et images)
  const mainActors = credits.cast?.filter((actor: any) => actor.order <= 10);

  return (
    <div className="container mx-auto">
       <button
            onClick={onReturn}
            className="mt-4 text-white px-4 py-2 mb-2 rounded bg-transparent"
          >
           ← Back
        </button>
        <style className="blur-lg">
        {`
          body {
            background: ${backgroundImage} no-repeat center center fixed;
            background-size: cover;
          }
        `}
      </style>
      <div className="flex flex-row md:grid-cols-2 gap-4 m-0 ">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-72 h-auto basis-1/4"
          />
          <div className="container w=5/6 self-end basis-3/4">
            <p className="text-3xl">{movie.title}</p>
            <p className="w-full h-auto">{movie.overview}</p>
            <p>{movie.release_date}</p>
            
            </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Équipe du film</h2>
        <div className="flex overflow-x-auto gap-4">
          {mainActors &&
            mainActors.map((actor: any) => (
              <div key={actor.credit_id} className="flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  alt={actor.name}
                  className="w-40 h-60 object-cover rounded-lg mb-2"
                />
                <p className="text-center">{actor.name}</p>
                {actor.character && (
                  <p className="text-sm text-gray-500">{actor.character}</p>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Images du film</h2>
        <div className="flex overflow-x-auto gap-4">
          {images.map((image: any) => (
            <img
              key={image.file_path}
              src={`https://image.tmdb.org/t/p/w1280${image.file_path}`}
              alt={`Image ${image.file_path}`}
              className="w-full h-auto object-cover rounded-lg mb-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
