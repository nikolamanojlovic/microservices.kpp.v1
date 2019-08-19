import React, { Component } from "react";
import { ProcesForma } from "./ProcesForma";
import { IProces } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import Proces from "./Proces";
import { Poruka } from "./Poruka";
import { IPoruka } from "../store/poruke/tipovi";
import { OmoguciDodavanjeAktivnosti, ObrisiProces } from "../store/proces/akcije";

// NOTE: Quick Fix
interface KreirajStanje {
    kljuc: number
}

type Props = KreirajLinkStateProps;

class Kreiraj extends Component<Props,KreirajStanje> {

    state: Readonly<KreirajStanje> = {
        kljuc: 0
    }

    _sacuvajTokProcesa() {
        OmoguciDodavanjeAktivnosti(false);
    }

    _obrisiProces() {
        ObrisiProces(this.props.proces!.idProcesa);
        OmoguciDodavanjeAktivnosti(true);
        this.setState({kljuc: this.state.kljuc+1})
    }

    _renderujFunkcionalnosti() {
        let { proces } = this.props;
        let funkcionalnosti: Array<JSX.Element> = [];

        if ( proces ) {
            funkcionalnosti.push(
                <h1 className="kreiraj-proces-h1">Ток процеса</h1>
            );
            funkcionalnosti.push(
                <div className="input-kreiraj-sacuvaj-tok">
                    <input className="input-dugme input-dugme-kreiraj" type="button" value="Сачувај ток процеса" onClick={() => this._sacuvajTokProcesa()}/>
                    <input className="input-dugme input-dugme-kreiraj input-dugme-crveno" type="button" value="Обриши процес" onClick={() => this._obrisiProces()}/>
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
        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Процес</h1>
                    <ProcesForma key={this.state.kljuc} proces={this.props.proces} />
                    {
                        this.props.poruka ? <Poruka poruka={this.props.poruka} /> : <span/>
                    }
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
    poruka?: IPoruka
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: {}): KreirajLinkStateProps => ({
    proces: state.procesReducer.proces,
    poruka: state.porukaReducer.poruka
});

export default connect(mapStateToProps)(Kreiraj);