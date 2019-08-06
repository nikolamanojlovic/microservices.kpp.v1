// TIPOVI
export interface ITok {
    RBToka: number
}

export interface IAktivnost {
    IDAktivnosti: number,
    Naziv: string,
    Opis: string
}

export interface IProces {
    IDProcesa: number,
    Naziv: string,
    Opis: string,
    Kategorija: string,
    VremeKreiranja: string,
    Tok: Array<ITok>
}

export interface IUslovTranzicije {
    IDProcesa: number,
    RBTranzicije: number,
    Rezultat: string,
    IzlazniProces: number,
    IzlazniTok: number,
    IDIzlaza: number
}

export interface ITranzicija {
    IDProcesa: number,
    RBTranzicije: number,
    UlazniProces: number,
    UlazniTok: number,
    IDUlaza: number,
    Tip: string,
    Uslov: string,
    UslovTranzicije: Array<IUslovTranzicije>
}

// TIPOVI STANJA
export interface IProcesStanje {
    proces?: IProces
    aktivnostiSistema: Array<IAktivnost>
}

// TIPOVI AKCIJA
export const SACUVAJ_PROCES = "SACUVAJ_PROCES";

export const VRATI_SVE_AKTIVNOSTI = "VRATI_SVE_AKTIVNOSTI";

export const DODAJ_POCETNU_AKTIVNOST = "DODAJ_POCETNU_AKTIVNOST";
export const DODAJ_PARALELNU_AKTIVNOST = "DODAJ_PARALELNU_AKTIVNOST";
export const DODAJ_SEKVENCIJALNU_AKTIVNOST = "DODAJ_SEKVENCIJALNU_AKTIVNOST";

// TIPOVI KREATORA AKCIJA
interface ISacuvajProcesAkcija {
    type: typeof SACUVAJ_PROCES
    payload: IProces
}

interface IVratiSveAktivnostiSistemaAkcija {
    type: typeof VRATI_SVE_AKTIVNOSTI
    payload: Array<IAktivnost>
}

// EXPORT AKCIJA
export type ProcesAkcije = ISacuvajProcesAkcija | IVratiSveAktivnostiSistemaAkcija;