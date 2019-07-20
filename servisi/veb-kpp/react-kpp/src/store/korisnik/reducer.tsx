import { KorisnikStanje, KorisnikTipoviAkcija, PRIJAVA, ODJAVA } from "./tipovi";

const inicijalnoStanje: KorisnikStanje = {
    korisnik: null
}

export function korisnikReducer(state = inicijalnoStanje, action: KorisnikTipoviAkcija) : KorisnikStanje {
    switch(action.type) {
        case PRIJAVA:
            return {...state, korisnik: action.payload}
        case ODJAVA:
            return {...state, korisnik: null}
        default:
            return state;
    }
}