import { IProces, SACUVAJ_PROCES } from "./tipovi";
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

export const SacucajProces = (proces : IProces) => {
    Axios.post(API_PROCESI + "/AutentifikacijaKontroler/Autentifikuj", {
      proces: proces
    }).then(function (response) {
      store.dispatch(sacuvajProces(response.data));
    }).catch(function (error) {
      store.dispatch(sacuvajPoruku({
        tip: TIP_PORUKE[1],
        tekst: error.response.data
      } as IPoruka));
    })
  }