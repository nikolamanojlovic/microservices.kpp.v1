import React, { Component } from "react";
import { IKorisnik } from "../store/korisnik/tipovi";
import { OdjaviKorisnika } from "../store/korisnik/akcije";
import { STRANICE } from "../pomocnici/Konstante";
import { NavigacijaOpcija } from "./NavigacijaOpcija";
import { ObrisiPoruku } from "../store/poruke/akcije";

interface NavigacijaFormaProps {
    korisnik: IKorisnik
}

type Props = NavigacijaFormaProps;

export class NavigacijaForma extends Component<Props> {

    _odjaviKorisnika = () => {
        ObrisiPoruku();
        OdjaviKorisnika();
    }

    render() {
        const {korisnik} = this.props;

        return (
            <div className="navigacija">
                <p className="navigacija-ulogovani">{(korisnik.ime + " " + korisnik.prezime).toUpperCase()}</p>
                <div className="navigacija-opcije">
                    {
                         STRANICE.map(function (e, i) {
                            return <NavigacijaOpcija key={i} opcija={e}/>
                        })
                    }
                </div>
                <input className="input-dugme" type="submit" value="ОДЈАВИ СЕ" onClick={() => this._odjaviKorisnika()}/>
            </div>
        )
    }
}