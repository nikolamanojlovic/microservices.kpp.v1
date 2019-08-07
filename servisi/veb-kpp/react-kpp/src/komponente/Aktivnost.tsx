import React, { Component } from "react";
import { IAktivnost } from "../store/proces/tipovi";
import { TIP_AKTIVNOSTI } from "../pomocnici/Konstante";

interface AktivnostProps {
    tip: string,
    aktivnosti: Array<IAktivnost>
}

interface AktivnostStanje {
    aktivnost: IAktivnost
}

type Props = AktivnostProps;

export class Aktivnost extends Component<Props> {

    state: Readonly<AktivnostStanje> = {
        aktivnost: this.props.aktivnosti[0]
    };

    UNSAFE_componentWillMount() {
        switch (this.props.tip) {
            case TIP_AKTIVNOSTI[0]:
                this.setState({ ...this.state, aktivnost: this._vratiAktivnostPoID(0)});
                break;
        }
    }

    _vratiAktivnostPoID = (id: number): IAktivnost => {
        // RETURNS SMALL LETTERS INSTEAD OF BIG
        const aktivnost = this.props.aktivnosti.filter(e => {
            return e.idAktivnosti === id;
        });

        console.log(aktivnost)
        return aktivnost[0] as IAktivnost;
    }

    _vratiAktivnostUZavisnostiOdTipa = () => {
        switch (this.props.tip) {
            case TIP_AKTIVNOSTI[0]:
                return (<div className="aktivnost"></div>);
            default:
                return <div />;
        }
    }

    render() {
        return (
            <div className="aktivnost-kontejner">
                {
                    this._vratiAktivnostUZavisnostiOdTipa()
                }
                <div className="aktivnost-funkcionalnosti">

                </div>
            </div>
        )
    }
}