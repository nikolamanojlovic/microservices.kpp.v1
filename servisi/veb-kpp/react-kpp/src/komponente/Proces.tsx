import React, { Component, FormEvent } from "react";
import { StanjeAplikacije } from "../store/konfiguracija";
import { IAktivnost, IProces, ITok } from "../store/proces/tipovi";
import { connect } from "react-redux";
import { VratiSveAktivnostiSistema, ObrisiPodproces, DodajTok, OmoguciDodavanjeAktivnosti, AzurirajNazivPodprocesa, OmoguciDodavanjeAktivnostiUPodprocesu, VratiSvePodproceseSistema, SacuvajSekvencijalnuAktivnost, VratiKrajnjuAktivnost, DodajTranziciju } from "../store/proces/akcije";
import Tok from "./Tok";
import { SacuvajPoruku, ObrisiPoruku } from "../store/poruke/akcije";
import { TIP_PORUKE, PORUKE, TIP_TRANZICIJE } from "../pomocnici/Konstante";

interface ProcesProps {
    nadproces?: IProces,
    nadtok?: ITok,
    proces: IProces
}

interface ProcesStanje {
    naziv: string
}

type Props = ProcesProps & ProcesLinkStateProps;

class Proces extends Component<Props, ProcesStanje> {

    state: Readonly<ProcesStanje> = {
        naziv: ""
    }

    UNSAFE_componentWillMount() {
        let { nadproces, proces } = this.props;
        VratiSveAktivnostiSistema();
        VratiSvePodproceseSistema(nadproces === undefined ? proces.idProcesa : nadproces.idProcesa);
    }

    _obrisiPodproces() {
        ObrisiPodproces(this.props.proces);
        OmoguciDodavanjeAktivnostiUPodprocesu(true);
        OmoguciDodavanjeAktivnosti(true);
    }

    _dodajTok() {
        let { proces } = this.props;
        DodajTok({
            proces: proces,
            tok: {
                rbToka: proces.tokovi.length + 1,
                aktivnostiUToku: [],
                podprocesiUToku: []
            }
        })
    }

    _izmeniProces() {
        let { proces } = this.props;

        if (this.state.naziv.length < 3) {
            SacuvajPoruku({
                tip: TIP_PORUKE[1],
                tekst: PORUKE.nazivPodprocesaGreska
            });
            return;
        }


        let prikaziGresku: boolean = false;

        proces.tokovi.forEach(t => {
            let aktivnosti: number = t.aktivnostiUToku.filter(a => {
                return a.idAktivnosti !== 0 && a.idAktivnosti !== 1;
            }).length;

            let podprocesi: number = t.podprocesiUToku.length;

            if (aktivnosti + podprocesi < 1) {
                prikaziGresku = true;
            }
        })

        if (prikaziGresku) {
            SacuvajPoruku({
                tip: TIP_PORUKE[1],
                tekst: PORUKE.brojAktivnostiUTokuGreska
            });
            return;
        }


        proces.tokovi.forEach(t => {
            VratiKrajnjuAktivnost({ proces: proces, tok: t });
            DodajTranziciju({ nadproces: proces, nadtok: t, ulazniProces: proces, ulazniTok: t, idUlaza: 1, tip: TIP_TRANZICIJE[1], uslov: "", uslovTranzicije: [] });
        });

        proces.naziv = this.state.naziv;
        AzurirajNazivPodprocesa(this.props.proces);
        OmoguciDodavanjeAktivnostiUPodprocesu(true);
        OmoguciDodavanjeAktivnosti(true);
        ObrisiPoruku();
    }

    _obradiPromenu(e: FormEvent<HTMLInputElement>) {
        this.setState({ ...this.state, [e.currentTarget.name]: e.currentTarget.value })
    }

    render() {
        const { proces } = this.props;
        return (
            <div className="proces-kontejner">
                <div className={"proces" + (this.props.nadproces ? " podproces-kontejner" : "")}>
                    {
                        this.props.nadproces ? <input className="input-podproces" name="naziv" type="text" value={this.props.proces.naziv !== "" ? this.props.proces.naziv : this.state.naziv} disabled={this.props.proces.naziv !== ""} onChange={(e: FormEvent<HTMLInputElement>) => this._obradiPromenu(e)} /> : <span />
                    }
                    {
                        this.props.proces.tokovi.map((e) => {
                            return <Tok key={e.rbToka} proces={proces} tok={e} aktivnostiSistema={this.props.aktivnostiSistema} podprocesiSistema={this.props.podprocesiSistema} nadproces={this.props.nadproces} />
                        })
                    }
                </div>
                {
                    this.props.nadproces && this.props.proces.naziv === "" ?
                        <div className="proces-funkcionalnosti">
                            <svg className="input svg-obrisi proces-obrisi-podproces" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._obrisiPodproces()}>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                            </svg>
                            <svg className="input proces-dodaj-tok" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajTok()}>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._izmeniProces()}>
                                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                            </svg>
                        </div> : <span />
                }
            </div>
        )
    }
}

interface ProcesLinkStateProps {
    aktivnostiSistema: Array<IAktivnost>,
    podprocesiSistema: Array<IProces>
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: ProcesProps): ProcesLinkStateProps => ({
    aktivnostiSistema: state.procesReducer.aktivnostiSistema,
    podprocesiSistema: state.procesReducer.podprocesiSistema
});

export default connect(mapStateToProps)(Proces);