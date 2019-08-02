import { korisnikReducer } from './korisnik/reducer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { KorisnikAkcije } from './korisnik/tipovi';
import thunk, { ThunkMiddleware } from "redux-thunk";
import {STANJE} from '../pomocnici/Konstante';

function ucitajStanje(): StanjeAplikacije | undefined {
    try {
        const serializovanoStanje = localStorage.getItem(STANJE)


        if (serializovanoStanje === null) {
            return undefined;
        }
        return JSON.parse(serializovanoStanje);
    } catch (error) {
        console.log(error.message);
        return undefined;
    }
}

function sacuvajStanje(stanje: StanjeAplikacije): void {
    try {
        const serializovanoStanje = JSON.stringify(stanje);
        localStorage.setItem(STANJE, serializovanoStanje)
    } catch (error) {
        console.log(error.message);
    }
}


// SVE AKCIJE KOJE APLIKACIJA IMA
export type AkcijeAplikacije = KorisnikAkcije;

// SVI REDUCER-I KOJE APLIKACIJA IMA
const reducerAplikacije = combineReducers({
    korisnikReducer
});

// SVA STANJA KOJE APLIKACIJA IMA
export type StanjeAplikacije = ReturnType<typeof reducerAplikacije>

export const store = createStore(reducerAplikacije, ucitajStanje(), applyMiddleware(thunk as ThunkMiddleware<StanjeAplikacije, AkcijeAplikacije>));

store.subscribe(() => {
    sacuvajStanje(store.getState());
});