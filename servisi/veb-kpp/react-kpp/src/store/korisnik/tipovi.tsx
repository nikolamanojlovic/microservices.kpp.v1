export interface Korisnik {
    id: string,
    jmbg: string,
    ime: string,
    prezime: String
}

export interface KorisnikStanje {
    korisnik: Korisnik | null
}

export const PRIJAVA = "PRIJAVA";
export const ODJAVA = "ODJAVA";

interface PrijavaAkcija {
    type: typeof PRIJAVA
    payload: Korisnik
  }

  interface OdjavaAkcija {
    type: typeof ODJAVA
  }

  export type KorisnikTipoviAkcija = PrijavaAkcija | OdjavaAkcija;