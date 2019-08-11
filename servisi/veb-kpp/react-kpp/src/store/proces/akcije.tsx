import { IProces, SACUVAJ_PROCES, VRATI_SVE_AKTIVNOSTI, IAktivnost, ITok, DODAJ_SEKVENCIJALNU_AKTIVNOST, DODAJ_PARALELNU_AKTIVNOST, DODAJ_TOK, OMOGUCI_DODAVANJE_AKTIVNOSTI, OBRISI_PODPROCES } from "./tipovi";
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

export const obrisiPodproces = (podproces: IProces): AkcijeAplikacije => {
  return {
    type: OBRISI_PODPROCES,
    payload: podproces
  }
}

export const dodajTok = ({idProcesa, noviTok} : {idProcesa: number, noviTok: ITok}): AkcijeAplikacije => {
  return {
    type: DODAJ_TOK,
    payload: {idProcesa: idProcesa, noviTok: noviTok}
  }
}

export const omoguciDodavanjeAktivnosti = (payload: boolean): AkcijeAplikacije => {
  return {
    type: OMOGUCI_DODAVANJE_AKTIVNOSTI,
    payload: payload
  }
}

export const vratiSveAktivnostiSistema = (aktivnosti: Array<IAktivnost>): AkcijeAplikacije => {
  return {
    type: VRATI_SVE_AKTIVNOSTI,
    payload: aktivnosti
  }
}

export const dodajSekvencijalnuAktivnost = ({proces, tok, aktivnost} : {proces: IProces, tok: ITok, aktivnost: IAktivnost}): AkcijeAplikacije => {
  return {
    type: DODAJ_SEKVENCIJALNU_AKTIVNOST,
    payload: {
      proces: proces,
      tok: tok,
      aktivnost: aktivnost
    }
  }
}

export const dodajParalelnuAktivnost = ({proces, tok, podproces} : {proces: IProces, tok: ITok, podproces: IProces}): AkcijeAplikacije => {
  return {
    type: DODAJ_PARALELNU_AKTIVNOST,
    payload: {
      proces: proces,
      tok: tok,
      podproces: podproces
    }
  }
}

// FUNKCIJE
export const SacuvajProces = ({ naziv, kategorija, opis }: { naziv: string, kategorija: string, opis: string }) => {
  Axios.post(API_PROCESI + "/KreriajKontroler/SacuvajProces", {
    naziv: naziv,
    kategorija: kategorija,
    opis: opis,
    tok: [{ RBToka: 1 }]
  }).then(function (response) {
    store.dispatch(sacuvajProces(response.data));
  }).catch(function (error) {
    store.dispatch(sacuvajProces({
      idProcesa: 1,
      naziv: naziv,
      opis: opis,
      kategorija: kategorija,
      vremeKreiranja: Date.now().toString(),
      tok: [{
        rbToka: 1,
        aktivnostiUToku: [],
        podprocesiUToku: [],
        tranzicije: [],
      } as ITok],
      tranzicije: []
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
  Axios.get(API_PROCESI + "/PomocniKontroler/VratiAktivnostiSistema")
    .then(function (response) {
      store.dispatch(vratiSveAktivnostiSistema(response.data));
    }).catch(function (error) {
      store.dispatch(sacuvajPoruku({
        tip: TIP_PORUKE[1],
        tekst: error.response.data
      } as IPoruka));
    })
}

export const ObrisiPodproces = (podproces: IProces) => {
  store.dispatch(obrisiPodproces(podproces));
}

export const OmoguciDodavanjeAktivnosti = (omoguci : boolean) => {
  store.dispatch(omoguciDodavanjeAktivnosti(omoguci));
}

export const SacuvajSekvencijalnuAktivnost = ({proces, tok, aktivnost} : {proces: IProces, tok: ITok, aktivnost: IAktivnost}) => {
  store.dispatch(dodajSekvencijalnuAktivnost({proces, tok, aktivnost}));
}

export const SacuvajParalelnuAktivnost = ({proces, tok, podproces} : {proces: IProces, tok: ITok, podproces: IProces}) => {
  store.dispatch(dodajParalelnuAktivnost({proces, tok, podproces}));
}