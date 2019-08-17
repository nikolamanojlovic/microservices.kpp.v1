import React, { Component } from "react";
import { IAktivnost, IProces, ITok } from "../store/proces/tipovi";
import { OmoguciDodavanjeAktivnosti, SacuvajParalelnuAktivnost, ObrisiTok, OmoguciDodavanjeAktivnostiUPodprocesu, SacuvajPocetnuAktivnost, DodajTranziciju } from "../store/proces/akcije";
import { Aktivnost } from "./Aktivnost";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import Proces from "./Proces";
import { TIP_TRANZICIJE } from "../pomocnici/Konstante";

interface TokProps {
    proces: IProces,
    tok: ITok,
    aktivnostiSistema: Array<IAktivnost>,
    podprocesiSistema: Array<IProces>,
    nadproces?: IProces
}

interface TokStanje {
    aktivnostiUToku?: JSX.Element,
    tok: Array<JSX.Element>
}

type Props = TokProps & TokLinkStateProps;

class Tok extends Component<Props, TokStanje> {

    state: Readonly<TokStanje> = {
        aktivnostiUToku: undefined,
        tok: []
    };

    UNSAFE_componentWillMount() {
        let { proces, tok } = this.props;
        if (tok.aktivnostiUToku.length === 0) {
            SacuvajPocetnuAktivnost({ proces, tok });
            DodajTranziciju({nadproces: proces, nadtok: tok, ulazniProces: proces, ulazniTok: tok, idUlaza: 0, tip: TIP_TRANZICIJE[1], uslov: "", uslovTranzicije: []})
        }
        OmoguciDodavanjeAktivnosti(true);
    }

    _obrisiStanje() {
        this.setState({ aktivnostiUToku: undefined })
        OmoguciDodavanjeAktivnosti(true);
    }

    _daLiOmogucitiDodavanjeAktivnosti(): boolean {
        return this.props.nadproces === undefined;
    }

    _dodajSekvencijalnuAktivnost() {
        this.props.nadproces ? OmoguciDodavanjeAktivnostiUPodprocesu(false) : OmoguciDodavanjeAktivnosti(false);

        this.setState({
            ...this.state, aktivnostiUToku: <Aktivnost proces={this.props.proces} tok={this.props.tok} aktivnostiSistema={this.props.aktivnostiSistema} podprocesiSistema={this.props.podprocesiSistema}
                obrisiStanje={() => this._obrisiStanje()} omoguciPromenu={() => this._daLiOmogucitiDodavanjeAktivnosti()} aktivnostPodprocesa={this.props.nadproces !== undefined} />
        })
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

        SacuvajParalelnuAktivnost({ proces, tok, podproces });
        DodajTranziciju({nadproces: proces, nadtok: tok, ulazniProces: proces, ulazniTok: tok, idUlaza: podproces.idProcesa, tip: TIP_TRANZICIJE[1], uslov: "", uslovTranzicije: []});
        OmoguciDodavanjeAktivnosti(false);
    }

    _obrisiTok() {
        let { proces, tok } = this.props;
        ObrisiTok({ proces, tok })
    }

    _kreirajFunkcionalnosti() {
        if (this.props.nadproces) {
            return (<div className="tok-funkcionalnosti">
                {
                    this.props.proces.tok.length > 2 && this.props.proces.naziv === "" ?
                        <svg className="input svg-obrisi input-tok-obrisi" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._obrisiTok()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                        </svg>
                        : <span />
                }
                {
                    this.props.proces.naziv === "" && this.props.omoguciDodavanjeAktivnostiUPodprocesu ?
                        <svg className="input input-tok-dodaj-aktivnost" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajSekvencijalnuAktivnost()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg> : <span />
                }
            </div>);
        } else {
            return (<div className="tok-funkcionalnosti">
                {
                    this.props.omoguciDodavanjeAktivnosti ?
                        <svg className="input input-tok-dodaj-aktivnost" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajSekvencijalnuAktivnost()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg> : <span />
                }
                {
                    this.props.omoguciDodavanjeAktivnosti ?
                        <svg className="input input-tok-dodaj-paralelnu-aktivnost" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this._dodajParalelnuAktivnost()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                        </svg> : <span />
                }
            </div>);
        }
    }

    _renderujTok() {
        let tok: Array<JSX.Element> = [];

        this.props.proces.tranzicije.forEach(t => {
            this.props.tok.aktivnostiUToku.forEach((aut) => {
                if ( t.ulazniTok === this.props.tok.rbToka && t.idUlaza === aut.idAktivnosti ) {
                    tok.push(<Aktivnost proces={this.props.proces} tok={this.props.tok} aktivnost={aut} aktivnostPodprocesa={this.props.nadproces !== undefined}/>);
                }
            });
            this.props.tok.podprocesiUToku.forEach((put) => {
                if ( t.ulazniTok === this.props.tok.rbToka && t.idUlaza === put.idProcesa ) {
                    tok.push(<Proces nadproces={this.props.proces} nadtok={this.props.tok} proces={put} />);
                }
            });
        })

        return tok;
    }

    render() {
        return (
            <div className="tok-kontejner">
                <div className="tok">
                    {
                       this._renderujTok()
                    }
                    {
                        this.state.aktivnostiUToku
                    }
                </div>
                {
                    this._kreirajFunkcionalnosti()
                }
            </div>
        )
    }
}

interface TokLinkStateProps {
    omoguciDodavanjeAktivnosti: boolean,
    omoguciDodavanjeAktivnostiUPodprocesu: boolean
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: TokProps): TokLinkStateProps => ({
    omoguciDodavanjeAktivnosti: state.procesReducer.omoguciDodavanjeAktivnosti,
    omoguciDodavanjeAktivnostiUPodprocesu: state.procesReducer.omoguciDodavanjeAktivnostiUPodprocesu
});

export default connect(mapStateToProps)(Tok);