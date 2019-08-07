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
                this.setState({ ...this.state, aktivnost: this._vratiAktivnostPoID(0) });
                break;
            case TIP_AKTIVNOSTI[1]:
                this.setState({ ...this.state, aktivnost: this._vratiAktivnostPoID(1) });
                break;
        }
    }

    _vratiAktivnostPoID = (id: number): IAktivnost => {
        const aktivnost = this.props.aktivnosti.filter(e => {
            return e.idAktivnosti === id;
        });
        return aktivnost[0] as IAktivnost;
    }

    _vratiAktivnostUZavisnostiOdTipa = () => {
        switch (this.props.tip) {
            case TIP_AKTIVNOSTI[0]:
                return (
                    <div className="aktivnost aktivnost-pocetna">
                        <p>{this.state.aktivnost.naziv}</p>
                    </div>
                );
            case TIP_AKTIVNOSTI[2]:
                return (
                    <div className="aktivnost">
                        <p>Изабери активност:</p>
                        <select className="input-tekst input-kreiraj input-aktivnost" name="izabrana-aktivnost">
                            {
                                this.props.aktivnosti.map(function (e, i) {
                                    return <option value={i}>{e.naziv}</option>
                                })
                            }
                        </select>
                    </div>
                );
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