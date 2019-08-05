import { IProcesStanje, ProcesAkcije, SACUVAJ_PROCES, VRATI_SVE_AKTIVNOSTI } from "./tipovi";

// INICIJALNO STANJE
const inicijalnoStanje: IProcesStanje = {
    proces: undefined,
    aktivnostiSistema: []
}

// REDUCER
const procesReducer = (state = inicijalnoStanje, action: ProcesAkcije) : IProcesStanje => {
    switch(action.type) {
        case SACUVAJ_PROCES:
            return {...state, proces: action.payload}
        case VRATI_SVE_AKTIVNOSTI:
            state.aktivnostiSistema = action.payload;
            return state;
        default:
            return state;
    }
}

export {procesReducer};