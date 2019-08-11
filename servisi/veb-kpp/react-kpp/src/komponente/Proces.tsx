import React, { Component } from "react";
import { StanjeAplikacije } from "../store/konfiguracija";
import { IAktivnost, IProces } from "../store/proces/tipovi";
import { connect } from "react-redux";
import { VratiSveAktivnostiSistema, SacuvajParalelnuAktivnost, ObrisiPodproces, DodajTok } from "../store/proces/akcije";
import Tok from "./Tok";

interface ProcesProps {
    nadproces?: IProces,
    proces: IProces
}

type Props = ProcesProps & ProcesLinkStateProps;

class Proces extends Component<Props> {

    UNSAFE_componentWillMount() {
        VratiSveAktivnostiSistema();
    }

    _obrisiPodproces() {
        ObrisiPodproces(this.props.proces);
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

    render() {
        const {proces} = this.props;
        return (
            <div className="proces-kontejner">
                <div className={"proces" + (this.props.nadproces ? " podproces-kontejner" : "") }>
                    {
                          this.props.nadproces ? <input className="input-podproces" name="naziv" type="text"/> : <span/>
                    }
                    {
                        this.props.proces.tok.map((e) => {
                            return <Tok key={e.rbToka} proces={proces} tok={e} aktivnostiSistema={this.props.aktivnostiSistema} nadproces={this.props.nadproces}/>
                        })
                    }
                </div>
                {
                    this.props.nadproces ?
                        <div className="proces-funkcionalnosti">
                            <svg className="input svg-obrisi proces-obrisi-podproces" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._obrisiPodproces()}>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                            </svg>
                            <svg className="input proces-dodaj-tok" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajTok()}>
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
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