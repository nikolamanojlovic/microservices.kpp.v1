import React, { Component } from "react";
import { ProcesForma } from "./ProcesForma";
import { IProces } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import Proces from "./Proces";
import { Poruka } from "./Poruka";
import { IPoruka } from "../store/poruke/tipovi";
import { OmoguciDodavanjeAktivnosti, ObrisiProces, VratiKrajnjuAktivnost, DodajTranziciju, OmoguciDodavanjeAktivnostiUPodprocesu, SacuvajTranzicijeZaProces, SacuvajProcesBezDispatch, SacuvajTokoveZaProces, SacuvajTokoveZaGlavniProces } from "../store/proces/akcije";
import { TIP_TRANZICIJE } from "../pomocnici/Konstante";

// QUICK FIX
interface KreirajStanje {
    kljuc: number,
}

type Props = KreirajLinkStateProps;

class Kreiraj extends Component<Props> {

    state: Readonly<KreirajStanje> = {
        kljuc: 0
    }

    _sacuvajTokProcesa() {
        let { proces } = this.props;
        let tok = this.props.proces!.tokovi[0];

        this._sacuvajPodproceseKojiNisuUSistemu();

        OmoguciDodavanjeAktivnosti(false);
        OmoguciDodavanjeAktivnostiUPodprocesu(false);

        VratiKrajnjuAktivnost({ proces: proces!, tok: tok });
        DodajTranziciju({ nadproces: proces!, nadtok: tok, ulazniProces: proces!, ulazniTok: tok, idUlaza: 1, tip: TIP_TRANZICIJE[1], uslov: "", uslovTranzicije: [] });

        SacuvajTokoveZaGlavniProces({ id: proces!.idProcesa, tokovi: proces!.tokovi })
        this.setState({ kljuc: this.state.kljuc + 1 });
    }

    _sacuvajPodproceseKojiNisuUSistemu() {
        let podprocesi = this.props.podprocesiSistema;

        if (podprocesi && podprocesi !== null && podprocesi.length > 0) {
            let podprocesiUToku = this.props.proces!.tokovi[0].podprocesiUToku;

            if (podprocesiUToku) {
                let podprocesiKojiNisuIzBE = podprocesiUToku.filter(p => {
                    return podprocesi.find(u => { return u.idProcesa === p.idProcesa }) === undefined;
                })

                if (podprocesiKojiNisuIzBE && podprocesiKojiNisuIzBE.length > 0) {
                    podprocesiKojiNisuIzBE.forEach(p => {
                        let podproces: IProces | undefined = SacuvajProcesBezDispatch({ naziv: p.naziv, kategorija: p.kategorija, opis: p.opis });
                        if (podproces) {
                            SacuvajTokoveZaProces({ id: podproces.idProcesa, tokovi: podproces.tokovi });
                            SacuvajTranzicijeZaProces({ id: podproces.idProcesa, tranzicije: p.tranzicije })
                        }
                    })
                }
            }
        }
    }

    _obrisiProces() {
        ObrisiProces(this.props.proces!.idProcesa);
        OmoguciDodavanjeAktivnosti(true);

        this.setState({ kljuc: this.state.kljuc + 1 });
    }

    _renderujFunkcionalnosti() {
        let { proces } = this.props;
        let funkcionalnosti: Array<JSX.Element> = [];

        if (proces) {
            funkcionalnosti.push(
                <h1 className="kreiraj-proces-h1">Ток процеса</h1>
            );
            funkcionalnosti.push(
                <div className="input-kreiraj-sacuvaj-tok">
                    <input className="input-dugme input-dugme-kreiraj" type="button" value="Сачувај ток процеса" onClick={() => this._sacuvajTokProcesa()} />
                    <input className="input-dugme input-dugme-kreiraj input-dugme-crveno" type="button" value="Обриши процес" onClick={() => this._obrisiProces()} />
                </div>
            );
            funkcionalnosti.push(
                <div className="kreiraj-tok-proces">
                    <Proces nadproces={undefined} proces={proces} />
                </div>
            )
        }
        return funkcionalnosti;
    }

    render() {
        const { poruka, proces } = this.props;

        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Процес</h1>
                    {
                        poruka ? <Poruka poruka={poruka} /> : <span />
                    }
                    <ProcesForma key={this.state.kljuc} proces={proces} />
                </div>
                {
                    this._renderujFunkcionalnosti()
                }
            </div>
        )
    }
}

interface KreirajLinkStateProps {
    proces?: IProces,
    poruka?: IPoruka,
    podprocesiSistema: Array<IProces>
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: {}): KreirajLinkStateProps => ({
    proces: state.procesReducer.proces,
    poruka: state.porukaReducer.poruka,
    podprocesiSistema: state.procesReducer.podprocesiSistema
});

export default connect(mapStateToProps)(Kreiraj);