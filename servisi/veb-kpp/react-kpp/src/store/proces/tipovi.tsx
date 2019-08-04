// TIPOVI
export interface ITok {
    IDProcesa: number,
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
}

// TIPOVI AKCIJA
export const SACUVAJ_PROCES = "SACUVAJ_PROCES";

// TIPOVI KREATORA AKCIJA
interface ISacuvajProcesAkcija {
    type: typeof SACUVAJ_PROCES
    payload: IProces
  }

// EXPORT AKCIJA
export type ProcesAkcije = ISacuvajProcesAkcija;