import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/konfiguracija';
import Pocetna from './stranice/Pocetna';

const App: React.FC = () => {
  return (
      <div className="App">
        <Pocetna/>
      </div>
  );
}

export default App;
