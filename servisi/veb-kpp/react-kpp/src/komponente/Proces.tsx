import React, { Component, FormEvent } from "react";
import { StanjeAplikacije } from "../store/konfiguracija";
import { IAktivnost, IProces } from "../store/proces/tipovi";
import { connect } from "react-redux";
import { VratiSveAktivnostiSistema, SacuvajParalelnuAktivnost, ObrisiPodproces, DodajTok, OmoguciDodavanjeAktivnosti, AzurirajNazivPodprocesa, OmoguciDodavanjeAktivnostiUPodprocesu } from "../store/proces/akcije";
import Tok from "./Tok";

interface ProcesProps {
    nadproces?: IProces,
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
        VratiSveAktivnostiSistema();
    }

    _obrisiPodproces() {
        ObrisiPodproces(this.props.proces);
        OmoguciDodavanjeAktivnosti(true);
    }

    _dodajTok() {
        let {proces} = this.props;
        DodajTok({
            proces: proces,
            tok: {
                rbToka: proces.tok.length + 1,
                aktivnostiUToku: [],
                podprocesiUToku: []
            }
        })
    }

    _izmeniProces() {
        let {proces} = this.props;

        proces.naziv = this.state.naziv;
        AzurirajNazivPodprocesa(this.props.proces);
        OmoguciDodavanjeAktivnostiUPodprocesu(false);
        OmoguciDodavanjeAktivnosti(true);
    }

    _obradiPromenu(e: FormEvent<HTMLInputElement>) {
        this.setState({ ...this.state, [e.currentTarget.name]: e.currentTarget.value })
    }

    render() {
        const {proces} = this.props;
        return (
            <div className="proces-kontejner">
                <div className={"proces" + (this.props.nadproces ? " podproces-kontejner" : "") }>
                    {
                          this.props.nadproces ? <input className="input-podproces" name="naziv" type="text" value={this.props.proces.naziv !== "" ? this.props.proces.naziv : this.state.naziv} disabled={this.props.proces.naziv !== ""} onChange={(e: FormEvent<HTMLInputElement>) => this._obradiPromenu(e)}/> : <span/>
                    }
                    {
                        this.props.proces.tok.map((e) => {
                            return <Tok key={e.rbToka} proces={proces} tok={e} aktivnostiSistema={this.props.aktivnostiSistema} nadproces={this.props.nadproces}/>
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
                        </div> : <span/>
                }
            </div>
        )
    }
}

interface ProcesLinkStateProps {
    aktivnostiSistema: Array<IAktivnost>
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: ProcesProps): ProcesLinkStateProps => ({
    aktivnostiSistema: state.procesReducer.aktivnostiSistema
});

export default connect(mapStateToProps)(Proces);