// TIPOVI
export interface IKorisnik {
    idRadnika: number,
    jmbg: string,
    ime: string,
    prezime: string,
    datumRodjenja: string,
    radniStaz: number,
    radnoMesto: [] | null,
    sifra: string,
    tip: string
}

export interface INavigacija {
    strana: string
}

// TIPOVI STANJA
export interface IKorisnikStanje {
    korisnik?: IKorisnik
    strana: string
}

// TIPOVI AKCIJA
export const PRIJAVA = "PRIJAVA";
export const ODJAVA = "ODJAVA";

export const PROMENA_STRANE = "PROMENA_STRANE";

// TIPOVI KREATORA AKCIJA
interface IPrijavaAkcija {
    type: typeof PRIJAVA
    payload: IKorisnik
  }

interface IOdjavaAkcija {
    type: typeof ODJAVA
}

interface IPromenaStrane {
    type: typeof PROMENA_STRANE
    payload: string
}

// EXPORT AKCIJA
export type KorisnikAkcije = IPrijavaAkcija | IOdjavaAkcija | IPromenaStrane;