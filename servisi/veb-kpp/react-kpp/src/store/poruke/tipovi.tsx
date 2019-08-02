// TIPOVI
export interface IPoruka {
    tip: string,
    poruka: string | null
}

// TIPOVI STANJA
export interface IPorukaStanje {
    poruka: IPoruka
}