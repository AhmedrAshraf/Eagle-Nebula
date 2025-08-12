import React, { useState } from 'react';
import { StarField } from './components/StarField';
import { Design4 } from './components/designs/Design4';
import { ResourcesPage } from './components/ResourcesPage';

type CurrentPage = 'home' | 'resources';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

  const navigateToResources = () => {
    setCurrentPage('resources');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarField intensity="low" meteors={true} />
      {currentPage === 'home' && (
        <Design4 onNavigateToResources={navigateToResources} />
      )}
      {currentPage === 'resources' && (
        <ResourcesPage onBack={navigateToHome} />
      )}
    </div>
  );
}

export default App;