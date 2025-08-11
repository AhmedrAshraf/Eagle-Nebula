import React from 'react';
import { StarField } from './components/StarField';
import { Design4 } from './components/designs/Design4';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <StarField intensity="low" meteors={true} />
      <Design4 />
    </div>
  );
}

export default App;