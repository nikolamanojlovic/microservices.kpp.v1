import { IProcesStanje, ProcesAkcije, SACUVAJ_PROCES, VRATI_SVE_AKTIVNOSTI, DODAJ_PARALELNU_AKTIVNOST, DODAJ_SEKVENCIJALNU_AKTIVNOST, IAktivnost, IProces, DODAJ_TOK, ITok, OMOGUCI_DODAVANJE_AKTIVNOSTI, OBRISI_PODPROCES, OBRISI_TOK, AZURIRAJ_NAZIV_PODPROCES, OMOGUCI_DODAVANJE_AKTIVNOSTI_U_PODPROCESU, VRATI_SVE_PODPROCESE, DODAJ_TRANZICIJU, IUslovTranzicije, ITranzicija } from "./tipovi";

// INICIJALNO STANJE
const inicijalnoStanje: IProcesStanje = {
    proces: undefined,
    aktivnostiSistema: [],
    podprocesiSistema: [],
    omoguciDodavanjeAktivnosti: true,
    omoguciDodavanjeAktivnostiUPodprocesu: true
}

// REDUCER
const procesReducer = (state = inicijalnoStanje, action: ProcesAkcije): IProcesStanje => {
    console.log(state)
    switch (action.type) {
        case SACUVAJ_PROCES:
            return { ...state, proces: action.payload };
        case OBRISI_PODPROCES:
            return { ...state, proces: _odbrisiPodprocesAktivnost({ state: state, podproces: action.payload }) };
        case AZURIRAJ_NAZIV_PODPROCES:
            return { ...state, proces: _azurirajNazivPodprocesaAktivnost({ state: state, podproces: action.payload }) };
        case OMOGUCI_DODAVANJE_AKTIVNOSTI:
            return { ...state, omoguciDodavanjeAktivnosti: action.payload };
        case OMOGUCI_DODAVANJE_AKTIVNOSTI_U_PODPROCESU:
            return { ...state, omoguciDodavanjeAktivnostiUPodprocesu: action.payload };
        case VRATI_SVE_AKTIVNOSTI:
            return { ...state, aktivnostiSistema: action.payload };
        case VRATI_SVE_PODPROCESE:
            return { ...state, podprocesiSistema: action.payload };
        case DODAJ_SEKVENCIJALNU_AKTIVNOST:
            return { ...state, proces: _dodajSekvencijalnuAktivnost({ state: state, proces: action.payload.proces, tok: action.payload.tok, aktivnost: action.payload.aktivnost }) };
        case DODAJ_PARALELNU_AKTIVNOST:
            return { ...state, proces: _dodajParalelnuAktivnost({ state: state, proces: action.payload.proces, tok: action.payload.tok, podproces: action.payload.podproces }) };
        case DODAJ_TRANZICIJU:
            return { ...state, proces: _dodajTranzicijuAktivnost({ state: state, nadproces: action.payload.nadproces, nadtok: action.payload.nadtok, ulazniProces: action.payload.ulazniProces, ulazniTok: action.payload.ulazniTok, idUlaza: action.payload.idUlaza }) };
        case DODAJ_TOK:
            return { ...state, proces: _dodajTokAktivnost({ state: state, proces: action.payload.proces, tok: action.payload.tok }) };
        case OBRISI_TOK:
            return { ...state, proces: _obrisiTokAktivnost({ state: state, proces: action.payload.proces, tok: action.payload.tok }) };
        default:
            return { ...state };
    }
}

const _odbrisiPodprocesAktivnost = ({ state, podproces }: { state: IProcesStanje, podproces: IProces }): IProces => {
    let pocetni = { ...state.proces! };
    _obrisiPodprocesRekurzija({ pocetni, podproces })

    return pocetni;
}

const _azurirajNazivPodprocesaAktivnost = ({ state, podproces }: { state: IProcesStanje, podproces: IProces }): IProces => {
    let pocetni = { ...state.proces! };
    _azurirajNazivPodprocesaRekurzija({ pocetni, podproces })

    return pocetni;
}

const _dodajSekvencijalnuAktivnost = ({ state, proces, tok, aktivnost }: { state: IProcesStanje, proces: IProces, tok: ITok, aktivnost: IAktivnost }): IProces => {
    let pocetni = { ...state.proces! };
    _dodajAktivnostRekurzija({ pocetni, proces, tok, aktivnost });

    return pocetni;
}

const _dodajParalelnuAktivnost = ({ state, proces, tok, podproces }: { state: IProcesStanje, proces: IProces, tok: ITok, podproces: IProces }): IProces => {
    let pocetni = { ...state.proces! };
    _dodajParalelnuAktivnostRekurzija({ pocetni, proces, tok, podproces })

    return pocetni;
}

const _dodajTranzicijuAktivnost = ({ state, nadproces, nadtok, ulazniProces, ulazniTok, idUlaza }: { state: IProcesStanje, nadproces: IProces, nadtok: ITok, ulazniProces: IProces, ulazniTok: ITok, idUlaza: number }): IProces => {
    let pocetni = { ...state.proces! };
    _dodajTranzicijuRekurzija({ pocetni, nadproces, nadtok, ulazniProces, ulazniTok, idUlaza });

    return pocetni;
}

const _dodajTokAktivnost = ({ state, proces, tok }: { state: IProcesStanje, proces: IProces, tok: ITok }): IProces => {
    let pocetni = { ...state.proces! };
    _dodajTokRekurzija({ pocetni: pocetni, proces: proces, tok: tok })

    return pocetni;
}

const _obrisiTokAktivnost = ({ state, proces, tok }: { state: IProcesStanje, proces: IProces, tok: ITok }): IProces => {
    let pocetni = { ...state.proces! };
    _obrisiTokRekurzija({ pocetni: pocetni, proces: proces, tok: tok })

    return pocetni;
}

// REKURZIVNE FUNKCIJE
const _obrisiPodprocesRekurzija = ({ pocetni, podproces }: { pocetni: IProces, podproces: IProces }): void => {
    pocetni.tok.map((t) => {
        t.podprocesiUToku.map((put) => {
            if (put.idProcesa === podproces.idProcesa) {
                t.podprocesiUToku = t.podprocesiUToku.filter(function (value) {
                    return value.idProcesa !== podproces.idProcesa;
                });
                return;
            } else {
                _obrisiPodprocesRekurzija({ pocetni: put, podproces: podproces });
            }
        })
    });
}

const _azurirajNazivPodprocesaRekurzija = ({ pocetni, podproces }: { pocetni: IProces, podproces: IProces }): void => {
    pocetni.tok.map((t) => {
        t.podprocesiUToku.map((put) => {
            if (put.idProcesa === podproces.idProcesa) {
                put.naziv = podproces.naziv;
                return;
            } else {
                _azurirajNazivPodprocesaRekurzija({ pocetni: put, podproces: podproces });
            }
        })
    });
}

const _dodajAktivnostRekurzija = ({ pocetni, proces, tok, aktivnost }: { pocetni: IProces, proces: IProces, tok: ITok, aktivnost: IAktivnost }): void => {
    pocetni.tok.map((t) => {
        if (pocetni.idProcesa === proces.idProcesa && t.rbToka === tok.rbToka) {
            t.aktivnostiUToku.push(aktivnost);
            return;
        } else {
            t.podprocesiUToku.map((pod) => {
                _dodajAktivnostRekurzija({ pocetni: pod, proces: proces, tok: tok, aktivnost: aktivnost });
            });
        }
    })
}

const _dodajParalelnuAktivnostRekurzija = ({ pocetni, proces, tok, podproces }: { pocetni: IProces, proces: IProces, tok: ITok, podproces: IProces }): void => {
    pocetni.tok.map((t) => {
        if (pocetni.idProcesa === proces.idProcesa && t.rbToka === tok.rbToka) {
            t.podprocesiUToku.push(podproces);
            return;
        } else {
            t.podprocesiUToku.map((pod) => {
                _dodajParalelnuAktivnostRekurzija({ pocetni: pod, proces: proces, tok: tok, podproces: podproces });
            });
        }
    })
}

const _dodajTranzicijuRekurzija = ({ pocetni, nadproces, nadtok, ulazniProces, ulazniTok, idUlaza }: { pocetni: IProces, nadproces: IProces, nadtok: ITok, ulazniProces: IProces, ulazniTok: ITok, idUlaza: number }): void => {
    if (nadproces.idProcesa === pocetni.idProcesa) {
        let novaTranzicija = {
            idProcesa: nadproces.idProcesa,
            rbTranzicije: nadtok.rbToka,
            ulazniProces: ulazniProces.idProcesa,
            ulazniTok: ulazniTok.rbToka,
            idUlaza: idUlaza,
            tip: "",
            uslov: "",
            uslovTranzicije: []
        } as ITranzicija;
    }

    pocetni.tok.map((t) => {
        t.podprocesiUToku.map((p) => {
            _dodajTranzicijuRekurzija({ pocetni: p, nadproces: nadproces, nadtok: nadtok, ulazniProces: ulazniProces, ulazniTok: ulazniTok, idUlaza: idUlaza });
        });
    })
}

const _dodajTokRekurzija = ({ pocetni, proces, tok }: { pocetni: IProces, proces: IProces, tok: ITok }): void => {
    if (pocetni.idProcesa === proces.idProcesa) {
        pocetni.tok.push(tok);
        return;
    }

    pocetni.tok.map((t) => {
        t.podprocesiUToku.map((p) => {
            _dodajTokRekurzija({ pocetni: p, proces: proces, tok: tok });
        })
    });
}

const _obrisiTokRekurzija = ({ pocetni, proces, tok }: { pocetni: IProces, proces: IProces, tok: ITok }): void => {
    if (pocetni.idProcesa === proces.idProcesa) {
        let noviTokovi = pocetni.tok.filter(function (value) {
            return value.rbToka !== tok.rbToka;
        });

        // ponovo dodeli brojeve
        noviTokovi.forEach(function (e, i) {
            e.rbToka = i + 1;
        });

        pocetni.tok = noviTokovi;
        return;
    }

    pocetni.tok.map((t) => {
        t.podprocesiUToku.map((p) => {
            _obrisiTokRekurzija({ pocetni: p, proces: proces, tok: tok });
        })
    });
}

export { procesReducer };