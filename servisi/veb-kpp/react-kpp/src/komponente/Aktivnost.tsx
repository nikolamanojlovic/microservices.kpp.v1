import React, { Component, FormEvent } from "react";
import { IAktivnost, IProces, ITok, IUslovTranzicije } from "../store/proces/tipovi";
import { OmoguciDodavanjeAktivnosti, SacuvajSekvencijalnuAktivnost, OmoguciDodavanjeAktivnostiUPodprocesu, DodajTranziciju, SacuvajParalelnuAktivnost } from "../store/proces/akcije";
import { TIP_TRANZICIJE } from "../pomocnici/Konstante";
import { Granjanje } from "./Granjanje";

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
    izabranProces?: IProces,
    uslov: string
    usloviTranzicije: Array<IUslovTranzicije>,
    granjanje?: JSX.Element
}

type Props = AktivnostProps;

export class Aktivnost extends Component<Props, AktivnostStanje> {

    state: Readonly<AktivnostStanje> = {
        izabrana: this.props.aktivnostiSistema ? this.props.aktivnostiSistema![0] : undefined,
        izabranProces: this.props.aktivnostiSistema ? undefined : (this.props.podprocesiSistema ? this.props.podprocesiSistema[0] : undefined),
        uslov: "",
        usloviTranzicije: [],
        granjanje: undefined
    };

    _izgasiGranjanje() {
        this.setState({ granjanje: undefined })
    }

    _postaviUsloveTranzicijeZaAktivnost = (uslov: string, uslovi: Array<IUslovTranzicije>) => {
        this.setState({ uslov: uslov, usloviTranzicije: uslovi });
    }

    _promeniIzabranuAktivnost(e: FormEvent<HTMLSelectElement>) {
        let aktivnost = this.props.aktivnostiSistema![parseInt(e.currentTarget.value)];
        let ofset = this.props.aktivnostiSistema ? this.props.aktivnostiSistema!.length : 0;

        if (aktivnost) {
            this.setState({ izabranProces: undefined, izabrana: aktivnost });
        } else {
            this.setState({ izabranProces: this.props.podprocesiSistema![parseInt(e.currentTarget.value) - ofset], izabrana: undefined });
        }
    }

    _dodajGranjanje() {
        this.setState({ granjanje: <Granjanje proces={this.props.proces} tok={this.props.tok} postojeciUslovi={this.state.usloviTranzicije} izgasiGranjanje={() => this._izgasiGranjanje()} postaviUsloveTranzicijeZaAktivnost={this._postaviUsloveTranzicijeZaAktivnost} /> })
    }

    _sacuvajAktivnost() {
        let { proces, tok } = this.props;
        let { izabrana, izabranProces } = this.state;

        if (izabrana) {
            SacuvajSekvencijalnuAktivnost({ proces, tok, aktivnost: izabrana! });
            DodajTranziciju({
                nadproces: proces, nadtok: tok, ulazniProces: proces, ulazniTok: tok, idUlaza: izabrana!.idAktivnosti, tip: TIP_TRANZICIJE[1],
                uslov: this.state.uslov, uslovTranzicije: this.state.usloviTranzicije
            });
        } else if (izabranProces) {
            SacuvajParalelnuAktivnost({ proces: proces, tok: tok, podproces: izabranProces });
            DodajTranziciju({
                nadproces: proces, nadtok: tok, ulazniProces: proces, ulazniTok: tok, idUlaza: izabranProces.idProcesa, tip: TIP_TRANZICIJE[1],
                uslov: "", uslovTranzicije: []
            });

        }

        this.props.obrisiStanje!();
        this.props.aktivnostPodprocesa ? OmoguciDodavanjeAktivnostiUPodprocesu(true) : OmoguciDodavanjeAktivnosti(this.props.omoguciPromenu!());
    }

    _renderujOpcije() {
        let ofset = this.props.aktivnostiSistema ? this.props.aktivnostiSistema!.length : 0;
        let opcije: Array<JSX.Element> = [];

        if (this.props.aktivnostiSistema) {
            this.props.aktivnostiSistema.map(function (e, i) {
                opcije.push(<option key={i} value={i}>{e.naziv}</option>);
            })
        }

        if (this.props.podprocesiSistema) {
            this.props.podprocesiSistema!.map(function (e, i) {
                opcije.push(<option key={i + ofset} value={i + ofset}>{e.naziv} - процес</option>)
            })
        }

        return opcije;
    }

    render() {
        return (
            <div className="aktivnost-kontejner">
                {
                    this.state.granjanje
                }
                <div className={"aktivnost" + (this.props.aktivnost && (this.props.aktivnost.idAktivnosti === 0 || this.props.aktivnost.idAktivnosti === 1) ? " aktivnost-pocetna" : "")}>
                    <div className="aktivnost-forma">
                        {
                            this.props.aktivnost ? <p className="aktivnost-naziv">{this.props.aktivnost.naziv}</p> :
                                <select className="input-tekst input-aktivnost" name="izabrana" onChange={(e: FormEvent<HTMLSelectElement>) => this._promeniIzabranuAktivnost(e)}>
                                    {
                                        this._renderujOpcije()
                                    }
                                </select>
                        }
                    </div>
                </div>
                {
                    this.props.aktivnost ? <span /> :
                        <div className="aktivnost-funkcionalnosti">
                            {
                                this.props.tok.aktivnostiUToku.length < 2 || this.state.izabranProces !== undefined ? <span /> :
                                    <svg className="input" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajGranjanje()}>
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                                    </svg>
                            }
                            <svg className="input" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._sacuvajAktivnost()}>
                                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                            </svg>
                            <svg className="input svg-obrisi proces-obrisi-podproces" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this.props.obrisiStanje!()}>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                            </svg>
                        </div>
                }
            </div>
        )
    }
}