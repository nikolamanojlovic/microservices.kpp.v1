import { PRIJAVA, ODJAVA, IKorisnik } from "./tipovi";
import { AkcijeAplikacije, StanjeAplikacije, store } from "../konfiguracija";
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
export const OdjaviKorisnika = () => {
  store.dispatch(odjava());
}

export const PrijavaFunkcija = ({ korisnickoIme, sifra }: { korisnickoIme: string, sifra: string }) => {
  Axios.post(API_ZAPOSLENI + "/AutentifikacijaKontroler/Autentifikuj", {
    korisnickoIme: korisnickoIme,
    sifra: sifra
  }).then(function (response) {
    store.dispatch(prijava(response.data));
  }).catch(function (response) {
    console.log("erro" + response.data);
  })
}