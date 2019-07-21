import React from "react";
import { IKorisnik } from "../store/korisnik/tipovi";
import { Naslovna } from "./Naslovna";

interface SadrzajProps {
    korisnik?: IKorisnik
}

type Props = SadrzajProps;

export class Sadrzaj extends React.Component<Props> {

    render() {
        const {korisnik} = this.props;

        return(
            <div className="sadrzaj-kontejner">
                 { korisnik ? <p/> : <Naslovna/> }
            </div>
        )
    }
}