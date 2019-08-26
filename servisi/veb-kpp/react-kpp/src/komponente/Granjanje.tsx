import React, { Component, FormEvent } from "react";
import { ITok, IUslovTranzicije, IProces } from "../store/proces/tipovi";
import { SELEDECA } from "../pomocnici/Konstante";

interface GranjanjeProps {
    proces: IProces,
    tok: ITok,
    postojeciUslovi: Array<IUslovTranzicije>,
    izgasiGranjanje?: () => void;
    postaviUsloveTranzicijeZaAktivnost: (uslov: string, uslovi: Array<IUslovTranzicije>) => void;
}

interface GranjanjeStanje {
    uslov: string,
    usloviElementi: Array<JSX.Element>
}

type Props = GranjanjeProps;

export class Granjanje extends Component<Props, GranjanjeStanje> {

    state: Readonly<GranjanjeStanje> = {
        uslov: "",
        usloviElementi: [
            <form data-key={0} className="granjanje-uslovi-input" onChange={(e: FormEvent<HTMLFormElement>) => this._obradiPromenu(e)}>
                <input className="input-tekst input-kreiraj input-granjanje-uslov" name="uslov" type="text" />
                <select className="input-tekst input-kreiraj input-granjanje-uslov" name="aktivnost" disabled={true}>
                    <option key={-1} value={SELEDECA}>{SELEDECA}</option>
                </select>
            </form>,
            <form data-key={1} className="granjanje-uslovi-input" onChange={(e: FormEvent<HTMLFormElement>) => this._obradiPromenu(e)}>
                <input className="input-tekst input-kreiraj input-granjanje-uslov" name="uslov" type="text" />
                <select className="input-tekst input-kreiraj input-granjanje-uslov" name="aktivnost" >
                    {
                        this._renderujOpcije()
                    }
                </select>
            </form>
        ]
    }

    _renderujOpcije(): Array<JSX.Element> {
        let opcije: Array<JSX.Element> = [];

        this.props.proces.tokovi.map((t) => {
            t.aktivnostiUToku.map((e, i) => {
                if (e.idAktivnosti !== 0 && e.idAktivnosti !== 1) {
                    opcije.push(<option key={i} value={e.idAktivnosti}>{(opcije.length + 1) + " - " + t.rbToka + " " + e.naziv}</option>);
                    return;
                };
            });
        })

        return opcije;
    }

    _dodajJosUslovaGranjanja() {
        let { usloviElementi } = this.state;

        usloviElementi.push(
            <form data-key={this.state.usloviElementi.length} className="granjanje-uslovi-input" onChange={(e: FormEvent<HTMLFormElement>) => this._obradiPromenu(e)}>
                <input className="input-tekst input-kreiraj input-granjanje-uslov" name="uslov" type="text" />
                <select className="input-tekst input-kreiraj input-granjanje-uslov" name="aktivnost" >
                    {
                        this._renderujOpcije()
                    }
                </select>
            </form>
        )
        this.setState({ ...this.state, usloviElementi: usloviElementi });
    }

    _obrisiUslovGranjanja() {
        let { usloviElementi } = this.state;

        if (usloviElementi.length > 2) {
            usloviElementi.pop();
            this.setState({ ...this.state, usloviElementi: usloviElementi });
        }
    }

    /********************** FUNKCIJE GRANJANJA **********************/
    _obradiPromenu(e: FormEvent<HTMLFormElement>) {
        let forma = (e.currentTarget as HTMLFormElement)!;
        let id: number = parseInt(forma.getAttribute("data-key")!);

        let uslovGranjanja: string = (forma.elements[0] as HTMLInputElement).value;

        let select: HTMLSelectElement = (forma.elements[1] as HTMLSelectElement);
        let idAktivnosti: string = (select.selectedOptions[0] as HTMLOptionElement).value;

        let postojeci: Array<IUslovTranzicije> = this.props.postojeciUslovi;

        postojeci[id] = {
            rbTranzicije: id,
            rezultat: uslovGranjanja,
            izlazniProces: this.props.proces.idProcesa,
            izlazniTok: this.props.tok.rbToka,
            idIzlaza: parseInt(idAktivnosti)
        }

        this.props.postaviUsloveTranzicijeZaAktivnost(this.state.uslov, postojeci);
    }

    _obradiPromenuUslov(e: FormEvent<HTMLInputElement>) {
        this.setState({uslov: e.currentTarget.value});
    }

    render() {
        return (
            <div className="granjanje-kontejner">
                <div className="granjanje-sadrzaj">
                    <div className="granjanje-funkcionalnosti">
                        <svg className="input input-granjanje-dodaj input-granjanje-funkcionalnosti" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajJosUslovaGranjanja()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                        {
                            this.state.usloviElementi.length <= 2 ? <span /> :
                                <svg className="input svg-obrisi input-granjanje-funkcionalnosti" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._obrisiUslovGranjanja()}>
                                    <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                </svg>
                        }
                        <svg className="input svg-obrisi" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this.props.izgasiGranjanje!()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                        </svg>
                    </div>
                    <div className="granjanje-uslovi-uslov">
                        <label className="label-granjanje">Услов грањања процеса:</label>
                        <input className="input-tekst input-kreiraj input-granjanje" name="uslov" type="text" onChange={(e: FormEvent<HTMLInputElement>) => this._obradiPromenuUslov(e)}/>
                    </div>
                    <div className="granjanje-uslovi-sadrzaj">
                        <label className="label-granjanje">Грањање:</label>
                        {
                            this.state.usloviElementi.map(e => {
                                return e;
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}