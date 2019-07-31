import { IKorisnikStanje, KorisnikAkcije, PRIJAVA, ODJAVA, IKorisnik } from "./tipovi";

// INICIJALNO STANJE
const inicijalnoStanje: IKorisnikStanje = {
    korisnik: undefined
}

// REDUCER
const korisnikReducer = (state = inicijalnoStanje, action: KorisnikAkcije) : IKorisnikStanje => {
    switch(action.type) {
        case PRIJAVA:
            return {...state, korisnik: action.payload}
        case ODJAVA:
            return {...state, korisnik: undefined}
        default:
            return state;
    }
}

export {korisnikReducer};