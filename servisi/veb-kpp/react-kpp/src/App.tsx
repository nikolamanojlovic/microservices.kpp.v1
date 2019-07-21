import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { konfigurisiStore } from './store/store';
import {Pocetna} from './stranice/Pocetna';
 
const App: React.FC = () => {
  return (
    <Provider store={konfigurisiStore()}>
      <div className="App">
        <Pocetna/>
      </div>
    </Provider>
  );
}

export default App;
