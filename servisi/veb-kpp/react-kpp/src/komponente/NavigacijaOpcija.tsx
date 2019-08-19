import React, { Component } from "react";
import { PromeniStranicu } from "../store/korisnik/akcije";
import { ObrisiPoruku } from "../store/poruke/akcije";

interface NavigacijaOpcijaProps {
    opcija: string
}

type Props = NavigacijaOpcijaProps;

export class NavigacijaOpcija extends Component<Props> {

    _promenaStrane() {
        ObrisiPoruku();
        PromeniStranicu(this.props.opcija);
    }

    render() {
        const { opcija } = this.props;

        return (
            <div className="navigacija-opcija">
                <div className="navigacija-opcija-pozadina">&nbsp;</div>
                <input className="input-dugme navigacija-opcija-dugme" type="submit" value={opcija} onClick={() => this._promenaStrane()}/>
            </div>
        )
    }
}