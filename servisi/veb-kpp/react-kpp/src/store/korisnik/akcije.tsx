import { PRIJAVA, ODJAVA, IKorisnik } from "./tipovi";
import { AkcijeAplikacije, StanjeAplikacije } from "../konfiguracija";
import { Dispatch } from "redux";
import Axios from "axios";
import { API_ZAPOSLENI } from "../../pomocnici/Konstante";

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
export const PrijaviKorisnika = (korisnik: IKorisnik) => {
  return (dispatch: Dispatch<AkcijeAplikacije>, getState: () => StanjeAplikacije) => {
    dispatch(prijava(korisnik))
  }
}

export const OdjaviKorisnika = ({ korisnickoIme, sifra }: { korisnickoIme: string, sifra: string }) => {
  return (dispatch: Dispatch<AkcijeAplikacije>, getState: () => StanjeAplikacije) => {
    // ulaz je data iz response-a dispatch(prijava())
  }
}

export const PrijavaFunkcija = ({ korisnickoIme, sifra }: { korisnickoIme: string, sifra: string }) => {
  Axios.post(API_ZAPOSLENI + "/autentifikuj", {
    korisnickoIme: korisnickoIme,
    sifra: sifra
  }).then(function (response) {
    console.log(response)
    PrijaviKorisnika(response.data)
  }).catch(function (response) {
    console.log(response);
  })
}