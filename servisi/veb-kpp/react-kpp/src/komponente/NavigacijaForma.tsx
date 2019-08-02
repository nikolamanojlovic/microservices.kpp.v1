import React, { Component } from "react";
import { IKorisnik } from "../store/korisnik/tipovi";

interface NavigacijaFormaProps {
    korisnik: IKorisnik
}

type Props = NavigacijaFormaProps;

export class NavigacijaForma extends Component<Props> {

    render() {
        const {korisnik} = this.props;

        return (
            <div className="navigacija">
                <p className="navigacija-ulogovani">{(korisnik.ime + " " + korisnik.prezime).toUpperCase()}</p>
            </div>
        )
    }
}