import React, { Component, ReactNode } from "react";
import { IPoruka } from "../store/poruke/tipovi";
import { TIP_PORUKE } from "../pomocnici/Konstante";

interface PorukaProps {
    poruka?: IPoruka
}

type Props = PorukaProps;

export class Poruka extends Component<Props> {

    _vratiHTMLPoruke = ({ tip, tekst }: { tip: string, tekst: string }): ReactNode => {
        switch (tip) {
            case TIP_PORUKE[1]:
                return <p className="poruka-greska">{tekst}</p>;
            case TIP_PORUKE[2]:
                return <p className="poruka-upozorenje">{tekst}</p>;
            default:
                return <p className="poruka-obavestenje">{tekst}</p>;
        }
    }

    render() {
        const { poruka } = this.props;

        return (
            poruka ? this._vratiHTMLPoruke({ tip: poruka.tip, tekst: poruka.tekst }) : <span />
        )
    }
}