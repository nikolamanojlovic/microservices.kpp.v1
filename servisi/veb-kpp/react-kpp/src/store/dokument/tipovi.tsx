/********************************* TIPOVI *********************************/ 
export interface IDokument {
    idDokumenta: number,
    sifraDokumenta: string,
    naziv: string,
    opis: string,
    tip: string
}

/********************************* TIP STANJA *********************************/ 
export interface IDokumentStanje {
    dokumenti: Array<IDokument>
}

/********************************* TIP AKCIJA *********************************/ 
export const VRATI_DOKUMENTE = "VRATI_DOKUMENTE";

/********************************* TIP KREATORA AKCIJA *********************************/ 
interface IVratiDokumente {
    type: typeof VRATI_DOKUMENTE
    payload: Array<IDokument>
}

/********************************* EKSPORT *********************************/ 
export type DokumentAkcije = IVratiDokumente;