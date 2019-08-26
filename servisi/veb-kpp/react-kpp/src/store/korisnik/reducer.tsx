import { IKorisnikStanje, KorisnikAkcije, PRIJAVA, ODJAVA, PROMENA_STRANE } from "./tipovi";
import { STRANICE } from "../../pomocnici/Konstante";

// INICIJALNO STANJE
const inicijalnoStanje: IKorisnikStanje = {
    korisnik: undefined,
    strana: STRANICE[3]
}

// REDUCER
const korisnikReducer = (state = inicijalnoStanje, action: KorisnikAkcije): IKorisnikStanje => {
    switch (action.type) {
        case PRIJAVA:
            return { ...state, korisnik: action.payload }
        case ODJAVA:
            return { ...state, korisnik: undefined }
        case PROMENA_STRANE:
            return { ...state, strana: action.payload }
        default:
            return state;
    }
}

export { korisnikReducer };