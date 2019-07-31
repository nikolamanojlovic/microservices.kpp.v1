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

// TIPOVI STANJA
export interface IKorisnikStanje {
    korisnik?: IKorisnik
}

// TIPOVI AKCIJA
export const PRIJAVA = "PRIJAVA";
export const ODJAVA = "ODJAVA";

// TIPOVI KREATORA AKCIJA
interface IPrijavaAkcija {
    type: typeof PRIJAVA
    payload: IKorisnik
  }

interface IOdjavaAkcija {
    type: typeof ODJAVA
}

// EXPORT AKCIJA
export type KorisnikAkcije = IPrijavaAkcija | IOdjavaAkcija;