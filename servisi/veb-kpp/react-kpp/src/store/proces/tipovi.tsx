// TIPOVI
export interface ITok {
    rbToka: number
    podprocesiUToku: Array<IProces>
    aktivnostiUToku: Array<IAktivnost>
}

export interface IAktivnost {
    idAktivnosti: number,
    naziv: string,
    opis: string
}

export interface IProces {
    idProcesa: number,
    naziv: string,
    opis: string,
    kategorija: string,
    vremeKreiranja: string,
    tok: Array<ITok>
    tranzicije: Array<ITranzicija>
}

export interface IUslovTranzicije {
    rbTranzicije: number,
    rezultat: string,
    izlazniProces: number,
    izlazniTok: number,
    idIzlaza: number
}

export interface ITranzicija {
    idProcesa: number,
    rbTranzicije: number,
    ulazniProces: number,
    ulazniTok: number,
    idUlaza: number,
    tip: string,
    uslov: string,
    uslovTranzicije: Array<IUslovTranzicije>
}

// TIPOVI STANJA
export interface IProcesStanje {
    proces?: IProces
    aktivnostiSistema: Array<IAktivnost>
    omoguciDodavanjeAktivnosti: boolean
}

// TIPOVI AKCIJA
export const SACUVAJ_PROCES = "SACUVAJ_PROCES";
export const OBRISI_PODPROCES = "OBRISI_PODPROCES";

export const VRATI_SVE_AKTIVNOSTI = "VRATI_SVE_AKTIVNOSTI";

export const DODAJ_PARALELNU_AKTIVNOST = "DODAJ_PARALELNU_AKTIVNOST";
export const DODAJ_SEKVENCIJALNU_AKTIVNOST = "DODAJ_SEKVENCIJALNU_AKTIVNOST";

export const DODAJ_TOK = "DODAJ_TOK";

export const OMOGUCI_DODAVANJE_AKTIVNOSTI = "OMOGUCI_DODAVANJE_AKTIVNOSTI";

// TIPOVI KREATORA AKCIJA
interface ISacuvajProcesAkcija {
    type: typeof SACUVAJ_PROCES
    payload: IProces
}

interface IObrisiPodprocesAkcija {
    type: typeof OBRISI_PODPROCES
    payload: IProces
}

interface IDodajTokAkcija {
    type: typeof DODAJ_TOK
    payload: {
        proces: IProces,
        tok: ITok
    }
}

interface IVratiSveAktivnostiSistemaAkcija {
    type: typeof VRATI_SVE_AKTIVNOSTI
    payload: Array<IAktivnost>
}

interface IDodajSekvencijalnuAktivnostAkcija {
    type: typeof DODAJ_SEKVENCIJALNU_AKTIVNOST
    payload: { proces: IProces, tok: ITok, aktivnost: IAktivnost }
}

interface IDodajParalelnuAktivnostAkcija {
    type: typeof DODAJ_PARALELNU_AKTIVNOST
    payload: { proces: IProces, tok: ITok, podproces: IProces }
}

interface IOmoguciDodavanjeAktivnosti {
    type: typeof OMOGUCI_DODAVANJE_AKTIVNOSTI,
    payload: boolean
}

// EXPORT AKCIJA
export type ProcesAkcije = ISacuvajProcesAkcija | IObrisiPodprocesAkcija | IDodajTokAkcija | IVratiSveAktivnostiSistemaAkcija | IDodajSekvencijalnuAktivnostAkcija | IDodajParalelnuAktivnostAkcija | IOmoguciDodavanjeAktivnosti;