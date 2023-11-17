import React from 'react';
import MovieList from './MovieList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 dark:bg-gray-800">
      <div className="p-12">
        <MovieList/>
      </div>
    </div>
  );
};

export default App;




