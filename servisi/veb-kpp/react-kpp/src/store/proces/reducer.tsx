import { IProcesStanje, ProcesAkcije, SACUVAJ_PROCES } from "./tipovi";

// INICIJALNO STANJE
const inicijalnoStanje: IProcesStanje = {
    proces: undefined
}

// REDUCER
const procesReducer = (state = inicijalnoStanje, action: ProcesAkcije) : IProcesStanje => {
    switch(action.type) {
        case SACUVAJ_PROCES:
            return {...state, proces: action.payload}
        default:
            return state;
    }
}

export {procesReducer};