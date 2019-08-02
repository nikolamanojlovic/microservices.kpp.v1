import React, { Component } from "react";
import { IKorisnik } from "../store/korisnik/tipovi";
import { PrijavaForma } from "./PrijavaForma";
import { NavigacijaForma } from "./NavigacijaForma";

interface NavigacijaProps {
    korisnik?: IKorisnik
}

type Props = NavigacijaProps;

export class Navigacija extends Component<Props> {

    render() {
        const {korisnik} = this.props;
    
        return (
            <div className="navigacija-kontejner">
                { korisnik ? <NavigacijaForma korisnik={korisnik}/> : <PrijavaForma/> }
            </div>
        )
    }
}