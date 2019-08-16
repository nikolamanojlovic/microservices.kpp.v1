import { IPoruka, SACUVAJ_PORUKU, OBRISI_PORUKU } from "./tipovi";
import { AkcijeAplikacije, store } from "../konfiguracija";

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

export const SacuvajPoruku = (poruka: IPoruka) => {
    store.dispatch(sacuvajPoruku(poruka));
}

export const ObrisiPoruku = () => {
    store.dispatch(obrisiPoruku());
}