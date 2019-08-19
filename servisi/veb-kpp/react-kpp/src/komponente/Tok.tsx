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
        if (tok.aktivnostiUToku === null) {
            SacuvajPocetnuAktivnost({ proces, tok });
            DodajTranziciju({ nadproces: proces, nadtok: tok, ulazniProces: proces, ulazniTok: tok, idUlaza: 0, tip: TIP_TRANZICIJE[1], uslov: "", uslovTranzicije: [] })
        }
        OmoguciDodavanjeAktivnosti(true);
        OmoguciDodavanjeAktivnostiUPodprocesu(true);
    }

    _obrisiStanje() {
        this.setState({ aktivnostiUToku: undefined })
        this.props.nadproces ? OmoguciDodavanjeAktivnostiUPodprocesu(true) : OmoguciDodavanjeAktivnosti(true);
    }

    _daLiOmogucitiDodavanjeAktivnosti(): boolean {
        return this.props.nadproces === undefined;
    }

    _dodajSekvencijalnuAktivnost() {
        let { tok } = this.props;
        this.props.nadproces ? OmoguciDodavanjeAktivnostiUPodprocesu(false) : OmoguciDodavanjeAktivnosti(false);

        let aktivnostiSistema = this.props.aktivnostiSistema.filter(e => tok.aktivnostiUToku.find(m => { return m.idAktivnosti === e.idAktivnosti }) === undefined);
        this.setState({
            ...this.state, aktivnostiUToku: <Aktivnost proces={this.props.proces} tok={tok} aktivnostiSistema={aktivnostiSistema} podprocesiSistema={this.props.podprocesiSistema}
                obrisiStanje={() => this._obrisiStanje()} omoguciPromenu={() => this._daLiOmogucitiDodavanjeAktivnosti()} aktivnostPodprocesa={this.props.nadproces !== undefined} />
        })
    }

    _dodajParalelnuAktivnost() {
        let { proces, tok } = this.props;
        let podproces = {
            idProcesa: parseInt(proces.idProcesa + "" + tok.rbToka + "" + (tok.podprocesiUToku === null || tok.podprocesiUToku === undefined ? 0 : tok.podprocesiUToku.length)),
            naziv: "",
            opis: "",
            kategorija: proces.kategorija,
            vremeKreiranja: Date.now().toString(),
            tokovi: [{ rbToka: 1, aktivnostiUToku: [], podprocesiUToku: [] }, { rbToka: 2, aktivnostiUToku: [], podprocesiUToku: [] }],
            tranzicije: []
        };

        SacuvajParalelnuAktivnost({ proces, tok, podproces });
        podproces.tokovi.forEach(t => {
            SacuvajPocetnuAktivnost({ proces: podproces, tok: t });
            DodajTranziciju({ nadproces: podproces, nadtok: t, ulazniProces: podproces, ulazniTok: t, idUlaza: 0, tip: TIP_TRANZICIJE[1], uslov: "", uslovTranzicije: [] });
        });
        DodajTranziciju({ nadproces: proces, nadtok: tok, ulazniProces: proces, ulazniTok: tok, idUlaza: podproces.idProcesa, tip: TIP_TRANZICIJE[1], uslov: "", uslovTranzicije: [] });
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
                    this.props.proces.tokovi.length > 2 && this.props.proces.naziv === "" ?
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
            let { tok } = this.props;
            let aktivnostiSistema = this.props.aktivnostiSistema !== null && tok.aktivnostiUToku !== null ? this.props.aktivnostiSistema.filter(e => tok.aktivnostiUToku.find(m => { return m.idAktivnosti === e.idAktivnosti }) === undefined) : [];

            return (<div className="tok-funkcionalnosti">
                {
                    this.props.omoguciDodavanjeAktivnosti && aktivnostiSistema.length > 0 ?
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
        let aktivnostOffset = 0;
        let podprocesiOffset = 0;

        if (this.props.proces.tranzicije != null) {
            this.props.proces.tranzicije.forEach(t => {

                if (this.props.tok.aktivnostiUToku != null) {
                    let aut = this.props.tok.aktivnostiUToku.slice(aktivnostOffset).find((aut) => { return t.ulazniTok === this.props.tok.rbToka && t.idUlaza === aut.idAktivnosti });

                    if (aut) {
                        tok.push(<Aktivnost proces={this.props.proces} tok={this.props.tok} aktivnost={aut} aktivnostPodprocesa={this.props.nadproces !== undefined} />);
                        aktivnostOffset = aktivnostOffset + 1;

                        if (t.uslovTranzicije.length > 1) {
                            tok.push(
                                <div className="uslov-u-toku">
                                    <svg className="svg-granjanje" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z" />
                                    </svg>
                                    <p className="uslov-u-toku-tekst-uslova">{t.uslov}</p>
                                    {
                                        t.uslovTranzicije.slice(1).map(ut => {
                                            return <p className="uslov-u-toku-tekst-redirekcija">{"[" + ut.rezultat + "] => " + this.props.aktivnostiSistema.filter(e => e.idAktivnosti === ut.idIzlaza)[0].naziv}</p>
                                        })
                                    }
                                </div>
                            )
                        }
                    }
                }

                if (this.props.tok.podprocesiUToku != null) {
                    let put = this._vratiPodproceseKojiNisuIzBE().slice(podprocesiOffset).find((put) => t.ulazniTok === this.props.tok.rbToka && t.idUlaza === put.idProcesa);

                    if (put) {
                        tok.push(<Proces nadproces={this.props.proces} nadtok={this.props.tok} proces={put} />);
                        podprocesiOffset = podprocesiOffset + 1;
                    }
                }

                if (this.props.tok.podprocesiUToku != null) {
                    let put = this._vratiPodproceseKojiSuIzBE().slice(podprocesiOffset).find((put) => t.ulazniTok === this.props.tok.rbToka && t.idUlaza === put.idProcesa);

                    if (put) {
                        tok.push(
                            <div className="aktivnost-kontejner">
                                <div className="aktivnost">
                                    <div className="aktivnost-forma">
                                        <p className="aktivnost-naziv">{put.naziv} (процес)</p>
                                    </div>
                                </div>
                            </div>
                        );
                        podprocesiOffset = podprocesiOffset + 1;
                    }
                }
            })

            return tok;
        }
    }

    _vratiPodproceseKojiNisuIzBE(): Array<IProces> {
        let { podprocesiSistema } = this.props;
        let { podprocesiUToku } = this.props.tok;

        return podprocesiUToku.filter(e => {
            return podprocesiSistema.find(m => e.idProcesa === m.idProcesa) === undefined;
        })
    }

    _vratiPodproceseKojiSuIzBE(): Array<IProces> {
        let { podprocesiSistema } = this.props;
        let { podprocesiUToku } = this.props.tok;

        return podprocesiUToku.filter(e => {
            return podprocesiSistema.find(m => e.idProcesa === m.idProcesa) !== undefined;
        })
    }

    /*
    _vratiIzlazneDokumente() : Array<IDokument> {
        let { dokumenti, izlazni } = this.props;

        if ( dokumenti ) {
            return dokumenti.filter(e => {
                return izlazni.find(i => { return i.idDokumenta === e.idDokumenta}) === undefined
            })
        }
        return [];
    }*/

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