import { IProcesStanje, ProcesAkcije, SACUVAJ_PROCES, VRATI_SVE_AKTIVNOSTI, DODAJ_PARALELNU_AKTIVNOST, DODAJ_SEKVENCIJALNU_AKTIVNOST, IAktivnost, IProces, DODAJ_TOK, ITok, OMOGUCI_DODAVANJE_AKTIVNOSTI } from "./tipovi";

// INICIJALNO STANJE
const inicijalnoStanje: IProcesStanje = {
    proces: undefined,
    aktivnostiSistema: [],
    omoguciDodavanjeAktivnosti: true
}

// REDUCER
const procesReducer = (state = inicijalnoStanje, action: ProcesAkcije): IProcesStanje => {
    switch (action.type) {
        case SACUVAJ_PROCES:
            return { ...state, proces: action.payload };
        case OMOGUCI_DODAVANJE_AKTIVNOSTI:
            return { ...state, omoguciDodavanjeAktivnosti: action.payload };
        case VRATI_SVE_AKTIVNOSTI:
            return { ...state, aktivnostiSistema: action.payload };
        case DODAJ_SEKVENCIJALNU_AKTIVNOST:
            const { proces, tok, aktivnost } = action.payload;
            return {...state, proces: _dodajSekvencijalnuAktivnost({ state: state, proces: proces, tok: tok, aktivnost: aktivnost })};
        case DODAJ_PARALELNU_AKTIVNOST:
            return _dodajParalelnuAktivnost({ state: state, idProcesa: action.payload.idProcesa, rbToka: action.payload.rbToka, proces: action.payload.proces })
        case DODAJ_TOK:
            const { idProcesa, noviTok } = action.payload;
            _dodajTokAktivnost({ state: state, idProcesa: idProcesa, noviTok: noviTok });
            return {...state};
        default:
            return {...state};
    }
}

const _dodajSekvencijalnuAktivnost = ({ state, proces, tok, aktivnost }: { state: IProcesStanje, proces: IProces, tok: ITok, aktivnost: IAktivnost }): IProces => {
    let pocetni = {...state.proces!};
    _dodajAktivnostRekurzija({ pocetni, proces, tok, aktivnost });

    return pocetni;
}

const _dodajParalelnuAktivnost = ({ state, idProcesa, rbToka, proces }: { state: IProcesStanje, idProcesa: number, rbToka: number, proces: IProces }): IProcesStanje => {

    return state;
}

const _dodajTokAktivnost = ({ state, idProcesa, noviTok }: { state: IProcesStanje, idProcesa: number, noviTok: ITok }): IProcesStanje => {
    let proces = {...state.proces!};
    _dodajTokRekurzija({ proces: proces, tok: noviTok, idProcesa: idProcesa })
    return state;
}

// REKURZIVNE FUNKCIJE
const _dodajAktivnostRekurzija = ({ pocetni, proces, tok, aktivnost }: { pocetni: IProces, proces: IProces, tok: ITok, aktivnost: IAktivnost }): void => {
    pocetni.tok.map((t) => {
        if (pocetni.idProcesa === proces.idProcesa && t.rbToka === tok.rbToka) {
            t.aktivnostiUToku.push(aktivnost);
            return;
        } else {
            tok.podprocesiUToku.map((pod) => {
                _dodajAktivnostRekurzija({ pocetni: pod, proces: proces, tok: tok, aktivnost: aktivnost });
            });
        }
    })
}

const _dodajTokRekurzija = ({ proces, tok, idProcesa }: { proces: IProces, tok: ITok, idProcesa: number }): void => {
    if (proces.idProcesa === idProcesa) {
        proces.tok.push(tok);
        return;
    }

    proces.tok.map((e) => {
        e.podprocesiUToku.map((p) => {
            _dodajTokRekurzija({ proces: p, tok: tok, idProcesa: idProcesa });
        })
    });
}

export { procesReducer };