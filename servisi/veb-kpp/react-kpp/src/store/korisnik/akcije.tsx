import { KorisnikTipoviAkcija, PRIJAVA, ODJAVA, Korisnik } from "./tipovi";

export function prijava(korisnik: Korisnik): KorisnikTipoviAkcija {
    return {
      type: PRIJAVA,
      payload: korisnik
    }
}

export function odjava(): KorisnikTipoviAkcija {
    return {
      type: ODJAVA
    }
}