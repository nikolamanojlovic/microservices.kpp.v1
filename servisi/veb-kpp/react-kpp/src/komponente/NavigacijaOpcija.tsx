import React, { Component } from "react";

interface NavigacijaOpcijaProps {
    opcija: string
}

type Props = NavigacijaOpcijaProps;

export class NavigacijaOpcija extends Component<Props> {

    render() {
        const { opcija } = this.props;

        return (
            <div className="navigacija-opcija">
                <div className="navigacija-opcija-pozadina">&nbsp;</div>
                <input className="input-dugme navigacija-opcija-dugme" type="submit" value={opcija} />
            </div>
        )
    }
}