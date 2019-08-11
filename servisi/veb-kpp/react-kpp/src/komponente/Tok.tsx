import React, { Component } from "react";
import { IAktivnost, IProces, ITok } from "../store/proces/tipovi";
import { OmoguciDodavanjeAktivnosti, SacuvajParalelnuAktivnost } from "../store/proces/akcije";
import { Aktivnost } from "./Aktivnost";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import Proces from "./Proces";

interface TokProps {
    proces: IProces,
    tok: ITok,
    aktivnostiSistema: Array<IAktivnost>,
    nadproces?: IProces
}

interface TokStanje {
    aktivnostiUToku?: JSX.Element,
}

type Props = TokProps & TokLinkStateProps;

class Tok extends Component<Props, TokStanje> {

    state: Readonly<TokStanje> = {
        aktivnostiUToku: undefined
    };

    _dodajSekvencijalnuAktivnost() {
        this.setState({ ...this.state, aktivnostiUToku: <Aktivnost proces={this.props.proces} tok={this.props.tok} aktivnostiSistema={this.props.aktivnostiSistema} /> })
    }

    _dodajParalelnuAktivnost() {
        let { proces, tok } = this.props;
        let podproces = {
            idProcesa: parseInt(proces.idProcesa + "" + tok.rbToka + "" + tok.podprocesiUToku.length),
            naziv: "",
            opis: "",
            kategorija: proces.kategorija,
            vremeKreiranja: Date.now().toString(),
            tok: [{ rbToka: 1, aktivnostiUToku: [], podprocesiUToku: [] }, { rbToka: 2, aktivnostiUToku: [], podprocesiUToku: [] }],
            tranzicije: []
        };

        SacuvajParalelnuAktivnost({proces, tok, podproces});
        this.setState({...this.state, aktivnostiUToku: <Proces nadproces={this.props.proces} proces={podproces} />})
    }

    _obrisiTok() {

    }

    render() {
        return (
            <div className="tok-kontejner">
                <div className="tok">
                    {
                        this.props.tok.aktivnostiUToku.map((aut) => {
                            return <Aktivnost proces={this.props.proces} tok={this.props.tok} aktivnost={aut} />;
                        })
                    }
                    {
                        this.state.aktivnostiUToku
                    }
                </div>
                <div className="tok-funkcionalnosti">
                    {
                        this.props.nadproces ?
                            <svg className="input svg-obrisi input-tok-obrisi" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                            </svg>
                            : <span/>
                    }
                    {

                        <svg className="input input-tok-dodaj-aktivnost" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajSekvencijalnuAktivnost()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                    }
                    {

                        <svg className="input input-tok-dodaj-paralelnu-aktivnost" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajParalelnuAktivnost()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                        </svg>
                    }
                </div>
            </div>
        )
    }
}

interface TokLinkStateProps {
    omoguciDodavanjeAktivnosti: boolean
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: TokProps): TokLinkStateProps => ({
    omoguciDodavanjeAktivnosti: state.procesReducer.omoguciDodavanjeAktivnosti
});

export default connect(mapStateToProps)(Tok);