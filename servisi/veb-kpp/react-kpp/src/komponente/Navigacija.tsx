import React from "react";
import { IKorisnik } from "../store/korisnik/tipovi";
import { PrijavaForma } from "./PrijavaForma";
import { NavigacijaForma } from "./NavigacijaForma";

interface NavigacijaProps {
    korisnik?: IKorisnik
}

type Props = NavigacijaProps;

export class Navigacija extends React.Component<Props> {

    render() {
        const {korisnik} = this.props;
    
        return (
            <div className="navigacija-kontejner">
                { console.log(korisnik) }
                { korisnik ? <NavigacijaForma/> : <PrijavaForma/> }
            </div>
        )
    }
}