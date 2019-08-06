import React, { Component } from "react";
import { IKorisnik } from "../store/korisnik/tipovi";
import { Naslovna } from "./Naslovna";
import Kreiraj from "./Kreiraj";

interface SadrzajProps {
    korisnik?: IKorisnik
}

type Props = SadrzajProps;

export class Sadrzaj extends Component<Props> {

    render() {
        const {korisnik} = this.props;

        return(
            <div className="sadrzaj-kontejner">
                {korisnik ? <Kreiraj /> : <Naslovna />}
            </div>
        )
    }
}