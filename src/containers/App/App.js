import React from 'react';
import './App.css';
import Display from '../Display/Display';
import Controls from '../Controls/Controls';
import Projects from '../Projects/Projects';

function App() {
  return (
    <main className="App">
      <h1>App</h1>
      <Display />
      <Controls />
      <Projects />
    </main>
  );
}

export default App;
