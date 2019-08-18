import React, { Component, FormEvent } from "react";
import { ITok, IUslovTranzicije, IProces } from "../store/proces/tipovi";
import { SELEDECA } from "../pomocnici/Konstante";

interface GranjanjeProps {
    izgasiGranjanje?: () => void;
    proces: IProces,
    tok: ITok
}

interface GranjanjeStanje {
    uslov: string,
    usloviGranjanja: Array<IUslovTranzicije>,
    usloviElementi: Array<JSX.Element>
}

type Props = GranjanjeProps;

export class Granjanje extends Component<Props, GranjanjeStanje> {

    state: Readonly<GranjanjeStanje> = {
        uslov: "",
        usloviGranjanja: [{
            rbTranzicije: 1,
            izlazniProces: this.props.proces.idProcesa,
            izlazniTok: this.props.tok.rbToka,
            idIzlaza: -1,
            rezultat: ""
        }],
        usloviElementi: [
            <div className="granjanje-uslovi-input">
                <input className="input-tekst input-kreiraj input-granjanje-uslov granjanje-uslov-label-levo" name="uslov" type="text" onChange={(e: FormEvent<HTMLInputElement>) => this._obradiRezultatSledece(e)}/>
                <select className="input-tekst input-kreiraj input-granjanje-uslov granjanje-uslov-label-desno" name="aktivnost" disabled={true}>
                    <option key={-1} value={SELEDECA}>{SELEDECA}</option>
                </select>
            </div>,
            <div className="granjanje-uslovi-input">
                <input className="input-tekst input-kreiraj input-granjanje-uslov granjanje-uslov-label-levo" name="uslov" type="text" />
                <select className="input-tekst input-kreiraj input-granjanje-uslov granjanje-uslov-label-desno" name="aktivnost" >
                    {
                        this._renderujOpcije()
                    }
                </select>
            </div>
        ]
    }

    _renderujOpcije(): Array<JSX.Element> {
        let opcije: Array<JSX.Element> = [];

        this.props.proces.tok.map((t) => {
            t.aktivnostiUToku.map((e, i) => {
                if (e.idAktivnosti !== 0 && e.idAktivnosti !== 1) {
                    opcije.push(<option key={e.idAktivnosti} value={e.idAktivnosti}>{(opcije.length + 1) + " - " + t.rbToka + " " + e.naziv}</option>)
                };
            });
        })

        return opcije;
    }

    _dodajJosUslovaGranjanja() {
        let { usloviElementi } = this.state;

        usloviElementi.push(
            <div className="granjanje-uslovi-input">
                <input className="input-tekst input-kreiraj input-granjanje-uslov granjanje-uslov-label-levo" name="uslov" type="text" />
                <select className="input-tekst input-kreiraj input-granjanje-uslov granjanje-uslov-label-desno" name="aktivnost" >
                    {
                        this._renderujOpcije()
                    }
                </select>
            </div>
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

    _postaviUslov(uslov: FormEvent<HTMLInputElement>) {
        this.setState({ uslov: uslov.currentTarget.value })
    }

    _obradiRezultatSledece(e: FormEvent<HTMLInputElement>) {
        let uslovi = this.state.usloviGranjanja;
        uslovi[0].rezultat = e.currentTarget.value;

        this.setState({ ...this.state, usloviGranjanja: uslovi });
    }

    render() {
        return (
            <div className="granjanje-kontejner">
                <div className="granjanje-sadrzaj">
                    <div className="granjanje-funkcionalnosti">
                        <svg className="input" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                        </svg>
                        <svg className="input svg-obrisi" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this.props.izgasiGranjanje!()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                        </svg>
                    </div>
                    <div className="granjanje-uslovi-sadrzaj">
                        <label className="label-granjanje">Услов грањања процеса:</label>
                        <input className="input-tekst input-kreiraj input-granjanje" name="uslov" type="text" value={this.state.uslov} onChange={(e: FormEvent<HTMLInputElement>) => this._postaviUslov(e)} />
                        {
                            this.state.usloviElementi.map(e => {
                                return e;
                            })
                        }
                        <svg className="input input-granjanje-dodaj" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajJosUslovaGranjanja()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                        {
                            this.state.usloviElementi.length <= 2 ? <span /> :
                                <svg className="input svg-obrisi" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._obrisiUslovGranjanja()}>
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                                </svg>
                        }
                    </div>
                </div>
            </div>
        )
    }
}