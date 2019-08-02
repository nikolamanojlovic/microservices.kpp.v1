import React, { Component } from "react";
import { IKorisnik } from "../store/korisnik/tipovi";
import { OdjaviKorisnika } from "../store/korisnik/akcije";

interface NavigacijaFormaProps {
    korisnik: IKorisnik
}

type Props = NavigacijaFormaProps;

export class NavigacijaForma extends Component<Props> {

    _odjaviKorisnika = () => {
        OdjaviKorisnika();
    }

    render() {
        const {korisnik} = this.props;

        return (
            <div className="navigacija">
                <p className="navigacija-ulogovani">{(korisnik.ime + " " + korisnik.prezime).toUpperCase()}</p>
                <input className="input-dugme" type="submit" value="ОДЈАВИ СЕ" onClick={() => this._odjaviKorisnika()}/>
            </div>
        )
    }
}