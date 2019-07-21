import { IKorisnikStanje, KorisnikTipoviAkcija, PRIJAVA, ODJAVA } from "./tipovi";

const inicijalnoStanje: IKorisnikStanje = {
    korisnik: undefined
}

export function korisnikReducer(state = inicijalnoStanje, action: KorisnikTipoviAkcija) : IKorisnikStanje {
    switch(action.type) {
        case PRIJAVA:
            return {...state, korisnik: action.payload}
        case ODJAVA:
            return {...state, korisnik: undefined}
        default:
            return state;
    }
}