import React, { Component, FormEvent } from "react";
import { ITok, IUslovTranzicije, IProces } from "../store/proces/tipovi";
import { SELEDECA } from "../pomocnici/Konstante";

interface GranjanjeProps {
    izgasiGranjanje?: () => void;
    proces: IProces,
    tok: ITok
}

interface GranjanjeStanje {
    usloviElementi: Array<JSX.Element>
}

type Props = GranjanjeProps;

export class Granjanje extends Component<Props, GranjanjeStanje> {

    state: Readonly<GranjanjeStanje> = {
        usloviElementi: [
            <form className="granjanje-uslovi-input">
                <input className="input-tekst input-kreiraj input-granjanje-uslov" name="uslov" type="text" />
                <select className="input-tekst input-kreiraj input-granjanje-uslov" name="aktivnost" disabled={true}>
                    <option key={-1} value={SELEDECA}>{SELEDECA}</option>
                </select>
            </form>,
            <form className="granjanje-uslovi-input">
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
        console.log("fweionfowe")
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
                        <svg className="input" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                        </svg>
                        <svg className="input svg-obrisi" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this.props.izgasiGranjanje!()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                        </svg>
                    </div>
                    <div className="granjanje-uslovi-uslov">
                        <label className="label-granjanje">Услов грањања процеса:</label>
                        <input className="input-tekst input-kreiraj input-granjanje" name="uslov" type="text" />
                    </div>
                    <div className="granjanje-uslovi-sadrzaj">
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