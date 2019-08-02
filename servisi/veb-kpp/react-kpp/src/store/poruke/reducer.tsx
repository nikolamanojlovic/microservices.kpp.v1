import { IPorukaStanje, SACUVAJ_PORUKU, OBRISI_PORUKU, PorukaAkcije } from "./tipovi";

// INICIJALNO STANJE
const inicijalnoStanje: IPorukaStanje = {
    poruka: undefined
}

// REDUCER
const porukaReducer = (state = inicijalnoStanje, action: PorukaAkcije) : IPorukaStanje => {
    switch(action.type) {
        case SACUVAJ_PORUKU:
            return {...state, poruka: action.payload}
        case OBRISI_PORUKU:
            return {...state, poruka: undefined}
        default:
            return state;
    }
}

export {porukaReducer};