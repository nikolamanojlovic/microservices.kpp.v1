// TIPOVI
export interface IPoruka {
    tip: string,
    tekst: string
}

// TIPOVI STANJA
export interface IPorukaStanje {
    poruka?: IPoruka
}

// TIPOVI AKCIJA
export const SACUVAJ_PORUKU = "SACUVAJ_PORUKU";
export const OBRISI_PORUKU = "OBRISI_PORUKU";

// TIPOVI KREATORA AKCIJA
interface ISacuvajPorukuAkcija {
    type: typeof SACUVAJ_PORUKU
    payload: IPoruka
  }

interface IObrisiPoruku {
    type: typeof OBRISI_PORUKU
}

// EXPORT AKCIJA
export type PorukaAkcije = ISacuvajPorukuAkcija | IObrisiPoruku;