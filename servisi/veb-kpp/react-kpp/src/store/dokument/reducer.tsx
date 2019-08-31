import { IDokumentStanje, DokumentAkcije, VRATI_DOKUMENTE } from "./tipovi";

// INICIJALNO STANJE
const inicijalnoStanje: IDokumentStanje = {
    dokumenti: []
}

// REDUCER
const dokumentReducer = (state = inicijalnoStanje, action: DokumentAkcije): IDokumentStanje => {
    switch (action.type) {
        case VRATI_DOKUMENTE:
            return { ...state, dokumenti: action.payload }
        default:
            return state;
    }
}

export { dokumentReducer };