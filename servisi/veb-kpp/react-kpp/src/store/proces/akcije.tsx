import { IProces, SACUVAJ_PROCES, VRATI_SVE_AKTIVNOSTI, IAktivnost, ITok, DODAJ_SEKVENCIJALNU_AKTIVNOST, DODAJ_PARALELNU_AKTIVNOST, DODAJ_TOK, OMOGUCI_DODAVANJE_AKTIVNOSTI, OBRISI_PODPROCES, OBRISI_TOK, AZURIRAJ_NAZIV_PODPROCES, OMOGUCI_DODAVANJE_AKTIVNOSTI_U_PODPROCESU, VRATI_SVE_PODPROCESE, IUslovTranzicije, DODAJ_TRANZICIJU, OBRISI_PROCES, ITranzicija } from "./tipovi";
import { AkcijeAplikacije, store } from "../konfiguracija";
import Axios from "axios";
import { API_PROCESI, TIP_PORUKE } from "../../pomocnici/Konstante";
import { sacuvajPoruku } from "../poruke/akcije";
import { IPoruka } from "../poruke/tipovi";
import { IDokument } from "../dokument/tipovi";

/******************************** KREATORI AKCIJA ********************************/
export const sacuvajProces = (proces: IProces): AkcijeAplikacije => {
  return {
    type: SACUVAJ_PROCES,
    payload: proces
  }
}

export const obrisiProces = (): AkcijeAplikacije => {
  return {
    type: OBRISI_PROCES
  }
}

export const obrisiPodproces = (podproces: IProces): AkcijeAplikacije => {
  return {
    type: OBRISI_PODPROCES,
    payload: podproces
  }
}

export const azurirajNazivPodprocesa = (podproces: IProces): AkcijeAplikacije => {
  return {
    type: AZURIRAJ_NAZIV_PODPROCES,
    payload: podproces
  }
}

export const dodajTok = ({ proces, tok }: { proces: IProces, tok: ITok }): AkcijeAplikacije => {
  return {
    type: DODAJ_TOK,
    payload: { proces: proces, tok: tok }
  }
}

export const obrisiTok = ({ proces, tok }: { proces: IProces, tok: ITok }): AkcijeAplikacije => {
  return {
    type: OBRISI_TOK,
    payload: { proces: proces, tok: tok }
  }
}

export const omoguciDodavanjeAktivnosti = (payload: boolean): AkcijeAplikacije => {
  return {
    type: OMOGUCI_DODAVANJE_AKTIVNOSTI,
    payload: payload
  }
}

export const omoguciDodavanjeUPodprocesu = (payload: boolean): AkcijeAplikacije => {
  return {
    type: OMOGUCI_DODAVANJE_AKTIVNOSTI_U_PODPROCESU,
    payload: payload
  }
}

export const vratiSveAktivnostiSistema = (aktivnosti: Array<IAktivnost>): AkcijeAplikacije => {
  return {
    type: VRATI_SVE_AKTIVNOSTI,
    payload: aktivnosti
  }
}

export const vratiSvePodproceseSistema = (podprocesi: Array<IProces>): AkcijeAplikacije => {
  return {
    type: VRATI_SVE_PODPROCESE,
    payload: podprocesi
  }
}

export const dodajSekvencijalnuAktivnost = ({ proces, tok, aktivnost }: { proces: IProces, tok: ITok, aktivnost: IAktivnost }): AkcijeAplikacije => {
  return {
    type: DODAJ_SEKVENCIJALNU_AKTIVNOST,
    payload: {
      proces: proces,
      tok: tok,
      aktivnost: aktivnost
    }
  }
}

export const dodajParalelnuAktivnost = ({ proces, tok, podproces }: { proces: IProces, tok: ITok, podproces: IProces }): AkcijeAplikacije => {
  return {
    type: DODAJ_PARALELNU_AKTIVNOST,
    payload: {
      proces: proces,
      tok: tok,
      podproces: podproces
    }
  }
}

export const dodajTranziciju = ({ nadproces, nadtok, ulazniProces, ulazniTok, idUlaza, tip, uslov, uslovTranzicije }: { nadproces: IProces, nadtok: ITok, ulazniProces: IProces, ulazniTok: ITok, idUlaza: number, tip: string, uslov: string, uslovTranzicije: Array<IUslovTranzicije> }): AkcijeAplikacije => {
  return {
    type: DODAJ_TRANZICIJU,
    payload: {
      nadproces: nadproces,
      nadtok: nadtok,
      ulazniProces: ulazniProces,
      ulazniTok: ulazniTok,
      idUlaza: idUlaza,
      tip: tip,
      uslov: uslov,
      uslovTranzicije: uslovTranzicije
    }
  }
}

/********************************* FUNKCIJE *********************************/
export const SacuvajProces = ({ naziv, kategorija, opis }: { naziv: string, kategorija: string, opis: string }) => {
  Axios.post(API_PROCESI + "/KreirajKontroler/SacuvajProces", {
    naziv: naziv,
    kategorija: kategorija,
    opis: opis,
    tokovi: [{ rbToka: 1 }]
  }).then(function (response) {
    store.dispatch(sacuvajProces(response.data));
  }).catch(function (error) {
    store.dispatch(sacuvajPoruku({
      tip: TIP_PORUKE[1],
      tekst: error.response.data
    } as IPoruka));
  })
}

export const SacuvajProcesBezDispatch = ({ naziv, kategorija, opis }: { naziv: string, kategorija: string, opis: string }): IProces | undefined => {
  let proces: IProces | undefined = undefined;

  Axios.post(API_PROCESI + "/KreirajKontroler/SacuvajProces", {
    naziv: naziv,
    kategorija: kategorija,
    opis: opis,
    tokovi: [{ rbToka: 1 }]
  }).then(function (response) {
    proces = response.data;
  }).catch(function (error) {
    store.dispatch(sacuvajPoruku({
      tip: TIP_PORUKE[1],
      tekst: error.response.data
    } as IPoruka));
  })

  return proces;
}

export const ObrisiProces = (IDProcesa: number) => {
  Axios.post(API_PROCESI + "/KreirajKontroler/ObrisiProces/" + IDProcesa)
    .then(function (response) {
      store.dispatch(obrisiProces());
      store.dispatch(sacuvajPoruku({
        tip: TIP_PORUKE[0],
        tekst: response.data
      }));
    }).catch(function (error) {
      store.dispatch(sacuvajPoruku({
        tip: TIP_PORUKE[1],
        tekst: error.response.data
      } as IPoruka));
    })
}

export const ObrisiProcesIzStanja = () => {
  store.dispatch(obrisiProces());
}

export const SacuvajAktivnost = ({ naziv, opis, ulazniDokumenti, izlazniDokumenti }: { naziv: string, opis: string, ulazniDokumenti: Array<IDokument>, izlazniDokumenti: Array<IDokument> }) => {
  Axios.post(API_PROCESI + "/KreirajKontroler/SacuvajAktivnost", {
    naziv: naziv,
    opis: opis,
    ulazi: ulazniDokumenti,
    izlazi: izlazniDokumenti
  }).then(function (response) {
    store.dispatch(sacuvajPoruku({
      tip: TIP_PORUKE[0],
      tekst: response.data
    } as IPoruka));
  }).catch(function (error) {
    store.dispatch(sacuvajPoruku({
      tip: TIP_PORUKE[1],
      tekst: error.response.data
    } as IPoruka));
  })
}

export const SacuvajTranzicijeZaProces = ({ id, tranzicije }: { id: number, tranzicije: Array<ITranzicija> }) => {
  Axios.post(API_PROCESI + "/KreirajKontroler/SacuvajTranzicijeZaProces/" + id, {
    tranzicije: tranzicije
  }).catch(function (error) {
    store.dispatch(sacuvajPoruku({
      tip: TIP_PORUKE[1],
      tekst: error.response.data
    } as IPoruka));
  })
}

export const SacuvajTokoveZaProces = ({ id, tokovi }: { id: number, tokovi: Array<ITok> }) => {
  Axios.post(API_PROCESI + "/KreirajKontroler/SacuvajTokoveZaProces/" + id, tokovi).catch(function (error) {
    store.dispatch(sacuvajPoruku({
      tip: TIP_PORUKE[1],
      tekst: error.response.data
    } as IPoruka));
  });
}

export const SacuvajTokoveZaGlavniProces = ({ id, tokovi }: { id: number, tokovi: Array<ITok> }) : boolean => {
  let ret: boolean = true;

  Axios.post(API_PROCESI + "/KreirajKontroler/SacuvajTokoveZaProces/" + id, tokovi).then(function (response) {
    store.dispatch(sacuvajPoruku({
      tip: TIP_PORUKE[0],
      tekst: response.data
    } as IPoruka));
    store.dispatch(obrisiProces());
  }).catch(function (error) {
    ret = false;
    store.dispatch(sacuvajPoruku({
      tip: TIP_PORUKE[1],
      tekst: error.response.data
    } as IPoruka));
  });

  return ret;
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

export const VratiSvePodproceseSistema = (IDPorcesa: number) => {
  Axios.get(API_PROCESI + "/PomocniKontroler/VratiSveMogucePodproceseSistema/" + IDPorcesa)
    .then(function (response) {
      store.dispatch(vratiSvePodproceseSistema(response.data));
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

export const AzurirajNazivPodprocesa = (podproces: IProces) => {
  store.dispatch(azurirajNazivPodprocesa(podproces));
}

export const DodajTok = ({ proces, tok }: { proces: IProces, tok: ITok }) => {
  store.dispatch(dodajTok({ proces, tok }));
}

export const ObrisiTok = ({ proces, tok }: { proces: IProces, tok: ITok }) => {
  store.dispatch(obrisiTok({ proces, tok }));
}

export const OmoguciDodavanjeAktivnosti = (omoguci: boolean) => {
  store.dispatch(omoguciDodavanjeAktivnosti(omoguci));
}

export const OmoguciDodavanjeAktivnostiUPodprocesu = (omoguci: boolean) => {
  store.dispatch(omoguciDodavanjeUPodprocesu(omoguci));
}

export const SacuvajSekvencijalnuAktivnost = ({ proces, tok, aktivnost }: { proces: IProces, tok: ITok, aktivnost: IAktivnost }) => {
  store.dispatch(dodajSekvencijalnuAktivnost({ proces, tok, aktivnost }));
}

export const SacuvajParalelnuAktivnost = ({ proces, tok, podproces }: { proces: IProces, tok: ITok, podproces: IProces }) => {
  store.dispatch(dodajParalelnuAktivnost({ proces, tok, podproces }));
}

export const SacuvajPocetnuAktivnost = ({ proces, tok }: { proces: IProces, tok: ITok }) => {
  Axios.get(API_PROCESI + "/PomocniKontroler/VratiPocetnuAktivnost")
    .then(function (response) {
      SacuvajSekvencijalnuAktivnost({ proces: proces, tok: tok, aktivnost: response.data });
    }).catch(function (error) {
      store.dispatch(sacuvajPoruku({
        tip: TIP_PORUKE[1],
        tekst: error.response.data
      } as IPoruka));
    })
}

export const VratiKrajnjuAktivnost = ({ proces, tok }: { proces: IProces, tok: ITok }) => {
  Axios.get(API_PROCESI + "/PomocniKontroler/VratiKrajnjuAktivnost")
    .then(function (response) {
      SacuvajSekvencijalnuAktivnost({ proces: proces, tok: tok, aktivnost: response.data });
    }).catch(function (error) {
      store.dispatch(sacuvajPoruku({
        tip: TIP_PORUKE[1],
        tekst: error.response.data
      } as IPoruka));
    })
}


export const DodajTranziciju = ({ nadproces, nadtok, ulazniProces, ulazniTok, idUlaza, tip, uslov, uslovTranzicije }: { nadproces: IProces, nadtok: ITok, ulazniProces: IProces, ulazniTok: ITok, idUlaza: number, tip: string, uslov: string, uslovTranzicije: Array<IUslovTranzicije> }) => {
  store.dispatch(dodajTranziciju({ nadproces, nadtok, ulazniProces, ulazniTok, idUlaza, tip, uslov, uslovTranzicije }));
}