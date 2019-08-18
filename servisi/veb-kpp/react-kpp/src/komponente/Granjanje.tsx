import React, { Component, FormEvent } from "react";
import { ITok, IUslovTranzicije, IProces } from "../store/proces/tipovi";
import { GranjanjeUslovi } from "./GranjanjeUslovi"
import { SELEDECA } from "../pomocnici/Konstante";
import { number } from "prop-types";

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
            izlazniProces: -1,
            izlazniTok: -1,
            idIzlaza: -1,
            rezultat: ""
        }],
        usloviElementi: [
            <GranjanjeUslovi proces={this.props.proces} tok={this.props.tok} sledeca={true} />,
            <GranjanjeUslovi proces={this.props.proces} tok={this.props.tok} sledeca={false} />
        ]
    }

    _postaviUslov(uslov: FormEvent<HTMLInputElement>) {
        this.setState({uslov: uslov.currentTarget.value})
    }

    _postaviUslovGranjanja({izlazniProces, izlazniTok, idIzlaza, rezultat}: {izlazniProces: number, izlazniTok: number, idIzlaza: number, rezultat: string}) {
        let uslovi = this.state.usloviGranjanja;
        uslovi.push({
            rbTranzicije: this.state.usloviGranjanja.length + 1,
            izlazniProces: izlazniProces,
            izlazniTok: izlazniTok,
            idIzlaza: idIzlaza,
            rezultat: rezultat
        })

        this.setState({ ...this.state, usloviGranjanja: uslovi });
    }

    _obradiRezultatSledece(rezultat: string) {
        let uslovi = this.state.usloviGranjanja;
        uslovi[0].rezultat = rezultat;

        this.setState({ ...this.state, usloviGranjanja: uslovi });
    }

    _dodajJosUslovaGranjanje() {
        let { usloviElementi } = this.state;

        usloviElementi.push(<GranjanjeUslovi proces={this.props.proces} tok={this.props.tok} sledeca={false} />)
        this.setState({ ...this.state, usloviElementi: usloviElementi });
    }

    _obrisiUslovGranjanja() {
        let { usloviElementi } = this.state;

        if (usloviElementi.length > 2) {
            usloviElementi.pop();
            this.setState({ ...this.state, usloviElementi: usloviElementi });
        }
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
                        <input className="input-tekst input-kreiraj input-granjanje" name="uslov" type="text" value={this.state.uslov} onChange={(e: FormEvent<HTMLInputElement>) => this._postaviUslov(e)}/>
                        {
                            this.state.usloviElementi.map(e => {
                                return e;
                            })
                        }
                        <svg className="input input-granjanje-dodaj" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajJosUslovaGranjanje()}>
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