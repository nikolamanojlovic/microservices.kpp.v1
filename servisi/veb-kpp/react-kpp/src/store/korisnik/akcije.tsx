import { KorisnikTipoviAkcija, PRIJAVA, ODJAVA, IKorisnik } from "./tipovi";

export function prijava(korisnik: IKorisnik): KorisnikTipoviAkcija {
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