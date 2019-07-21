import {korisnikReducer} from './korisnik/reducer';
import {combineReducers, createStore, Store} from 'redux';
import {IKorisnikStanje} from './korisnik/tipovi';

const glavniReducer = combineReducers({
    korisnik: korisnikReducer
});

export interface IStanje {
    korisnik: IKorisnikStanje
}

export function konfigurisiStore(): Store<IStanje> {
    return createStore(glavniReducer, undefined, undefined);
}