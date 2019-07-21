import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/konfiguracija';
import {Pocetna} from './stranice/Pocetna';
 
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Pocetna/>
      </div>
    </Provider>
  );
}

export default App;
