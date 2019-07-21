import { KorisnikAkcije, PRIJAVA, ODJAVA, IKorisnik } from "./tipovi";
import { AkcijeAplikacije, StanjeAplikacije } from "../konfiguracija";
import { Dispatch } from "redux";

// KREATORI AKCIJA
export const prijava = (korisnik: IKorisnik): AkcijeAplikacije => {
    return {
      type: PRIJAVA,
      payload: korisnik
    }
}

export const odjava = (): AkcijeAplikacije => {
    return {
      type: ODJAVA
    }
}

// KOMUNIKACIJA
export const PrijaviKorisnika = ({ korisnickoIme, sifra } : { korisnickoIme: string, sifra : string}) => {
    return (dispatch: Dispatch<AkcijeAplikacije>, getState: () => StanjeAplikacije) => {
        // ulaz je data iz response-a dispatch(prijava())
    }
}