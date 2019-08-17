/********************************* TIPOVI *********************************/ 
export interface ITok {
    rbToka: number
    podprocesiUToku: Array<IProces>
    aktivnostiUToku: Array<IAktivnost>
}

export interface IAktivnost {
    idAktivnosti: number,
    naziv: string,
    opis: string,
    tip: string
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

/********************************* TIP STANJA *********************************/ 
export interface IProcesStanje {
    proces?: IProces
    aktivnostiSistema: Array<IAktivnost>
    podprocesiSistema: Array<IProces>
    omoguciDodavanjeAktivnosti: boolean
    omoguciDodavanjeAktivnostiUPodprocesu: boolean
}

/********************************* TIP AKCIJA *********************************/ 
export const SACUVAJ_PROCES = "SACUVAJ_PROCES";
export const OBRISI_PODPROCES = "OBRISI_PODPROCES";
export const AZURIRAJ_NAZIV_PODPROCES = "AZURIRAJ_NAZIV_PODPROCES";

export const VRATI_SVE_AKTIVNOSTI = "VRATI_SVE_AKTIVNOSTI";
export const VRATI_SVE_PODPROCESE = "VRATI_SVE_PODPROCESE";

export const DODAJ_PARALELNU_AKTIVNOST = "DODAJ_PARALELNU_AKTIVNOST";
export const DODAJ_SEKVENCIJALNU_AKTIVNOST = "DODAJ_SEKVENCIJALNU_AKTIVNOST";
export const DODAJ_TRANZICIJU = "DODAJ_TRANZICIJU";

export const DODAJ_TOK = "DODAJ_TOK";
export const OBRISI_TOK = "OBRISI_TOK";

export const OMOGUCI_DODAVANJE_AKTIVNOSTI = "OMOGUCI_DODAVANJE_AKTIVNOSTI";
export const OMOGUCI_DODAVANJE_AKTIVNOSTI_U_PODPROCESU = "OMOGUCI_DODAVANJE_AKTIVNOSTI_U_PODPROCESU";

/********************************* TIP KREATORA AKCIJA *********************************/ 
interface ISacuvajProcesAkcija {
    type: typeof SACUVAJ_PROCES
    payload: IProces
}

interface IObrisiPodprocesAkcija {
    type: typeof OBRISI_PODPROCES
    payload: IProces
}

interface IAzurirajNazivPodprocesAkcija {
    type: typeof AZURIRAJ_NAZIV_PODPROCES
    payload: IProces
}

interface IDodajTokAkcija {
    type: typeof DODAJ_TOK
    payload: {
        proces: IProces,
        tok: ITok
    }
}

interface IObrisiTokAkcija {
    type: typeof OBRISI_TOK
    payload: {
        proces: IProces,
        tok: ITok
    }
}

interface IVratiSveAktivnostiSistemaAkcija {
    type: typeof VRATI_SVE_AKTIVNOSTI
    payload: Array<IAktivnost>
}

interface IVratiSvePodproceseSistemaAkcija {
    type: typeof VRATI_SVE_PODPROCESE
    payload: Array<IProces>
}

interface IDodajSekvencijalnuAktivnostAkcija {
    type: typeof DODAJ_SEKVENCIJALNU_AKTIVNOST
    payload: { proces: IProces, tok: ITok, aktivnost: IAktivnost }
}

interface IDodajParalelnuAktivnostAkcija {
    type: typeof DODAJ_PARALELNU_AKTIVNOST
    payload: { proces: IProces, tok: ITok, podproces: IProces }
}

interface IDodajTranziciju {
    type: typeof DODAJ_TRANZICIJU,
    payload: {nadproces: IProces, nadtok: ITok, ulazniProces: IProces, ulazniTok: ITok, idUlaza: number, tip: string, uslov: string, uslovTranzicije: Array<IUslovTranzicije>}
}

interface IOmoguciDodavanjeAktivnosti {
    type: typeof OMOGUCI_DODAVANJE_AKTIVNOSTI,
    payload: boolean
}

interface IOmoguciDodavanjeAktivnostiUPodprocesu {
    type: typeof OMOGUCI_DODAVANJE_AKTIVNOSTI_U_PODPROCESU,
    payload: boolean
}

/********************************* EKSPORT *********************************/ 
export type ProcesAkcije = ISacuvajProcesAkcija | IObrisiPodprocesAkcija | IAzurirajNazivPodprocesAkcija | IDodajTokAkcija | IObrisiTokAkcija 
                           | IVratiSveAktivnostiSistemaAkcija | IVratiSvePodproceseSistemaAkcija | IDodajSekvencijalnuAktivnostAkcija 
                           | IDodajParalelnuAktivnostAkcija | IOmoguciDodavanjeAktivnosti | IOmoguciDodavanjeAktivnostiUPodprocesu | IDodajTranziciju;