import { IPoruka, SACUVAJ_PORUKU, OBRISI_PORUKU } from "./tipovi";
import { AkcijeAplikacije } from "../konfiguracija";

// KREATORI AKCIJA
export const sacuvajPoruku = (poruka: IPoruka): AkcijeAplikacije => {
    return {
        type: SACUVAJ_PORUKU,
        payload: poruka
    }
}

export const obrisiPoruku = (): AkcijeAplikacije => {
    return {
        type: OBRISI_PORUKU
    }
}