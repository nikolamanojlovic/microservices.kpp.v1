import { IDokument, VRATI_DOKUMENTE } from "./tipovi";
import { AkcijeAplikacije, store } from "../konfiguracija";
import Axios from "axios";
import { API_PROCESI, TIP_PORUKE } from "../../pomocnici/Konstante";
import { sacuvajPoruku, ObrisiPoruku } from "../poruke/akcije";
import { IPoruka } from "../poruke/tipovi";

/******************************** KREATORI AKCIJA ********************************/
export const vratiDokumente = (dokumenti: Array<IDokument>): AkcijeAplikacije => {
    return {
        type: VRATI_DOKUMENTE,
        payload: dokumenti
    }
}

/********************************* FUNKCIJE *********************************/
export const VratiSveDokumenteSistema = () => {
    Axios.get(API_PROCESI + "/PomocniKontroler/VratiDokumenteSistema")
        .then(function (response) {
            store.dispatch(vratiDokumente(response.data));
            ObrisiPoruku();
        }).catch(function (error) {
            store.dispatch(sacuvajPoruku({
                tip: TIP_PORUKE[1],
                tekst: error.response.data
            } as IPoruka));
        })
}