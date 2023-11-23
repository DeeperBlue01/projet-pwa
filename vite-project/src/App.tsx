import React from 'react';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieList/>,
  },
  {
    path: "/Movie/:id",
    element: <MovieDetails/>,
  },
]);

const App: React.FC = () => {
  return (
        <RouterProvider router={router}/>
  );
};

export default App;

