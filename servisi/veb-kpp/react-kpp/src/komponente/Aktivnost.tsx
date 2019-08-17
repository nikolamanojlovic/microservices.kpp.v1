import React, { Component, FormEvent } from "react";
import { IAktivnost, IProces, ITok, IUslovTranzicije } from "../store/proces/tipovi";
import { OmoguciDodavanjeAktivnosti, SacuvajSekvencijalnuAktivnost, OmoguciDodavanjeAktivnostiUPodprocesu } from "../store/proces/akcije";

interface AktivnostProps {
    proces: IProces,
    tok: ITok,
    aktivnostiSistema?: Array<IAktivnost>,
    podprocesiSistema?: Array<IProces>,
    aktivnost?: IAktivnost,
    aktivnostPodprocesa: boolean
    obrisiStanje?: () => void;
    omoguciPromenu?: () => boolean;
}

interface AktivnostStanje {
    izabrana?: IAktivnost,
    usloviTranzicije: Array<IUslovTranzicije>
}

type Props = AktivnostProps;

export class Aktivnost extends Component<Props, AktivnostStanje> {

    state: Readonly<AktivnostStanje> = {
        izabrana: this.props.aktivnostiSistema ? this.props.aktivnostiSistema[0] : undefined,
        usloviTranzicije: []
    };

    _promeniIzabranuAktivnost(e: FormEvent<HTMLSelectElement>) {
        let aktivnost = this.props.aktivnostiSistema![parseInt(e.currentTarget.value)];
        this.setState({ izabrana: aktivnost });
    }

    _sacuvajAktivnost() {
        let { proces, tok } = this.props;
        let { izabrana } = this.state;

        SacuvajSekvencijalnuAktivnost({ proces, tok, aktivnost: izabrana! });

        this.props.obrisiStanje!();
        this.props.aktivnostPodprocesa ? OmoguciDodavanjeAktivnostiUPodprocesu(true) : OmoguciDodavanjeAktivnosti(this.props.omoguciPromenu!());
    }

    render() {
        return (
            <div className="aktivnost-kontejner">
                <div className={"aktivnost" + (this.props.aktivnost && (this.props.aktivnost.idAktivnosti === 0 || this.props.aktivnost.idAktivnosti === 1) ? " aktivnost-pocetna" : "" )}>
                    <div className="aktivnost-forma">
                        {
                            this.props.aktivnost ? <p className="aktivnost-naziv">{this.props.aktivnost.naziv}</p> :
                                <select className="input-tekst input-aktivnost" name="izabrana" onChange={(e: FormEvent<HTMLSelectElement>) => this._promeniIzabranuAktivnost(e)}>
                                    {
                                        this.props.aktivnostiSistema!.map(function (e, i) {
                                            return <option key={i} value={i}>{e.naziv}</option>
                                        })
                                    }
                                    {
                                        this.props.podprocesiSistema!.map(function (e, i) {
                                            return <option key={i} value={i}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                                                </svg>
                                                {e.naziv}
                                            </option>
                                        })
                                    }
                                </select>
                        }
                    </div>
                </div>
                {
                    this.props.aktivnost ? <span /> :
                        <div className="aktivnost-funkcionalnosti">

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._sacuvajAktivnost()}>
                                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                            </svg>
                        </div>
                }
            </div>
        )
    }
}