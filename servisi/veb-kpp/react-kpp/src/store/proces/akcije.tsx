import { IProces, SACUVAJ_PROCES, VRATI_SVE_AKTIVNOSTI, IAktivnost } from "./tipovi";
import { AkcijeAplikacije, store } from "../konfiguracija";
import Axios from "axios";
import { API_PROCESI, TIP_PORUKE } from "../../pomocnici/Konstante";
import { sacuvajPoruku } from "../poruke/akcije";
import { IPoruka } from "../poruke/tipovi";

// KREATORI AKCIJA
export const sacuvajProces = (proces: IProces): AkcijeAplikacije => {
  return {
    type: SACUVAJ_PROCES,
    payload: proces
  }
}

export const vratiSveAktivnostiSistema = (aktivnostiSistema: Array<IAktivnost>): AkcijeAplikacije => {
  return {
    type: VRATI_SVE_AKTIVNOSTI,
    payload: aktivnostiSistema
  }
}

// FUNKCIJE
export const SacuvajProces = ({ naziv, kategorija, opis }: { naziv: string, kategorija: string, opis: string }) => {
  Axios.post(API_PROCESI + "/KreriajKontroler/SacuvajProces", {
    naziv: naziv,
    kategorija: kategorija,
    opis: opis
  }).then(function (response) {
    store.dispatch(sacuvajProces(response.data));
  }).catch(function (error) {
    store.dispatch(sacuvajProces({
      IDProcesa: 1,
      Naziv: naziv,
      Opis: opis,
      Kategorija: kategorija,
      VremeKreiranja: Date.now().toString(),
    } as IProces));
    /*
    store.dispatch(sacuvajPoruku({
      tip: TIP_PORUKE[1],
      tekst: error.response.data
    } as IPoruka));
    */
  })
}

export const VratiSveAktivnostiSistema = () => {
  Axios.get(API_PROCESI + "/PomocniKontroler/VratiSveAktivnostiSistema")
    .then(function (response) {
      store.dispatch(vratiSveAktivnostiSistema(response.data));
    }).catch(function (error) {
      store.dispatch(sacuvajPoruku({
        tip: TIP_PORUKE[1],
        tekst: error.response.data
      } as IPoruka));
    })
}