import {korisnikReducer} from './korisnik/reducer';
import {combineReducers, createStore} from 'redux';

const glavniReducer = combineReducers({
    korisnik: korisnikReducer
});

export const store = createStore(glavniReducer);