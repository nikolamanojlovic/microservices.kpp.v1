import { korisnikReducer } from './korisnik/reducer';
import { combineReducers, createStore, Store, applyMiddleware } from 'redux';
import { KorisnikAkcije } from './korisnik/tipovi';
import thunk, { ThunkMiddleware } from "redux-thunk";

// SVE AKCIJE KOJE APLIKACIJA IMA
export type AkcijeAplikacije = KorisnikAkcije;

// SVI REDUCER-I KOJE APLIKACIJA IMA
const reducerAplikacije = combineReducers({
    korisnikReducer
});

// SVA STANJA KOJE APLIKACIJA IMA
export type StanjeAplikacije = ReturnType<typeof reducerAplikacije>

export const store = createStore(reducerAplikacije, applyMiddleware(thunk as ThunkMiddleware<StanjeAplikacije, AkcijeAplikacije>));