export interface IKorisnik {
    id: string,
    jmbg: string,
    ime: string,
    prezime: String
}

export interface IKorisnikStanje {
    korisnik?: IKorisnik
}

export const PRIJAVA = "PRIJAVA";
export const ODJAVA = "ODJAVA";

interface IPrijavaAkcija {
    type: typeof PRIJAVA
    payload: IKorisnik
  }

interface IOdjavaAkcija {
    type: typeof ODJAVA
}

  export type KorisnikTipoviAkcija = IPrijavaAkcija | IOdjavaAkcija;