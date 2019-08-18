export const API_ZAPOSLENI: string = "http://0.0.0.0:3001/api";
export const API_PROCESI: string = "http://0.0.0.0:3002/api";

export const STANJE: string = "kpp-stanje";
export const SELEDECA: string = "СЛЕДЕЋА";

export const TIP_PROCESA: string[] = ["Управљачки", "Кључни", "Помоћни"];
export const TIP_AKTIVNOSTI: string[] = ["Почетна", "Крајња", "Секвенцијална", "Паралелна"];
export const TIP_DOKUMENTA: string[] = ["doc, docx", "pdf", "mp3", "avi", "mov"];
export const TIP_PORUKE: string[] = ["Обавештење", "Грешка", "Упозорење"];
export const TIP_TRANZICIJE: string[] = ["Условни", "Безусловни"]

export const STRANICE: string[] = ["Почетна", "Претрага", "Креирај активност", "Креирај процес"];

export const PORUKE = {
    nazivPodprocesaGreska: "Назив подпроцеса мора имати бар три карактера.",
    brojAktivnostiUTokuGreska: "Сваки ток мора имати бар једну активност или бар један подпроцес."
};