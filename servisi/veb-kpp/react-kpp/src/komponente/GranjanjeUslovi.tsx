import React, { Component } from "react";
import { ITok, IProces } from "../store/proces/tipovi";
import { SELEDECA } from "../pomocnici/Konstante";

interface GranjanjeUsloviProps {
    proces: IProces,
    tok: ITok,
    sledeca: boolean
}

type Props = GranjanjeUsloviProps;

export class GranjanjeUslovi extends Component<Props> {

    _renderujOpcije() : Array<JSX.Element> {
        let opcije: Array<JSX.Element> = [];

        this.props.proces.tok.map((t) => {
            t.aktivnostiUToku.map((e, i) => {
                if (e.idAktivnosti !== 0 && e.idAktivnosti !== 1) {
                    opcije.push(<option key={i} value={i}>{(opcije.length + 1) + " - " + t.rbToka + " " + e.naziv}</option>)
                };
            });
        })

        return opcije;
    }

    render() {
        return (
            <div className="granjanje-uslovi">
                {
                    this.props.sledeca ?
                        <div className="granjanje-uslovi-input">
                            <input className="input-tekst input-kreiraj input-granjanje-uslov granjanje-uslov-label-levo" name="uslov" type="text" />
                            <select className="input-tekst input-kreiraj input-granjanje-uslov granjanje-uslov-label-desno" name="aktivnost" disabled={true}>
                                <option key={-1} value={SELEDECA}>{SELEDECA}</option>
                            </select>
                        </div>
                        :
                        <div className="granjanje-uslovi-input">
                            <input className="input-tekst input-kreiraj input-granjanje-uslov granjanje-uslov-label-levo" name="uslov" type="text" />
                            <select className="input-tekst input-kreiraj input-granjanje-uslov granjanje-uslov-label-desno" name="aktivnost">
                                {
                                    this._renderujOpcije()
                                }
                            </select>
                        </div>
                }
            </div>
        )
    }
}