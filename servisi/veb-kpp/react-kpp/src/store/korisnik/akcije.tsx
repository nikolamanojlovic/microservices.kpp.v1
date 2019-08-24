import { PRIJAVA, ODJAVA, IKorisnik, PROMENA_STRANE } from "./tipovi";
import { AkcijeAplikacije, store } from "../konfiguracija";
import Axios from "axios";
import { API_ZAPOSLENI, TIP_PORUKE } from "../../pomocnici/Konstante";
import { sacuvajPoruku, ObrisiPoruku } from "../poruke/akcije";
import { IPoruka } from "../poruke/tipovi";

/******************************** KREATORI AKCIJA ********************************/
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

export const promeniStranicu = (stranica: string): AkcijeAplikacije => {
  return {
    type: PROMENA_STRANE,
    payload: stranica
  }
}

/********************************* FUNKCIJE *********************************/ 
export const OdjaviKorisnika = () => {
  store.dispatch(odjava());
}

export const PrijavaFunkcija = ({ korisnickoIme, sifra }: { korisnickoIme: string, sifra: string }) => {
  Axios.post(API_ZAPOSLENI + "/AutentifikacijaKontroler/Autentifikuj", {
    korisnickoIme: korisnickoIme,
    sifra: sifra
  }).then(function (response) {
    store.dispatch(prijava(response.data));
  }).catch(function (error) {
    console.log(error.response)
    store.dispatch(sacuvajPoruku({
      tip: TIP_PORUKE[1],
      tekst: error.response.data
    } as IPoruka));
  })
}

export const PromeniStranicu = (strana: string) => {
  store.dispatch(promeniStranicu(strana))
}