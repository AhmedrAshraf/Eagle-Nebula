import { useState } from 'react';
import { StarField } from './components/StarField';
import { Design4 } from './components/designs/Design4';
import { ResourcesPage } from './components/ResourcesPage';
import { BlogsPage } from './components/BlogsPage';

type CurrentPage = 'home' | 'resources' | 'blogs';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

  const navigateToResources = () => {
    setCurrentPage('resources');
  };

  const navigateToBlogs = () => {
    setCurrentPage('blogs');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarField intensity="low" meteors={true} />
      {currentPage === 'home' && (
        <Design4 
          onNavigateToResources={navigateToResources}
          onNavigateToBlogs={navigateToBlogs}
        />
      )}
      {currentPage === 'resources' && (
        <ResourcesPage 
          onBack={navigateToHome} 
          onNavigateToBlogs={navigateToBlogs}
        />
      )}
      {currentPage === 'blogs' && (
        <BlogsPage 
          onBack={navigateToHome} 
          onNavigateToResources={navigateToResources}
        />
      )}
    </div>
  );
}

export default App;