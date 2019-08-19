import React, { Component } from "react";
import { ProcesForma } from "./ProcesForma";
import { IProces } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import Proces from "./Proces";
import { Poruka } from "./Poruka";
import { IPoruka } from "../store/poruke/tipovi";
import { OmoguciDodavanjeAktivnosti, ObrisiProces } from "../store/proces/akcije";
import { TIP_PORUKE } from "../pomocnici/Konstante";

interface KreirajProps {

}

type Props = KreirajProps & KreirajLinkStateProps;

class Kreiraj extends Component<Props> {

    _sacuvajTokProcesa() {
        OmoguciDodavanjeAktivnosti(false);
    }

    _obrisiProces() {
        ObrisiProces(this.props.proces!.idProcesa);
        OmoguciDodavanjeAktivnosti(true);
    }

    _renderujFunkcionalnosti() {
        let { proces, poruka } = this.props;
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
        const { proces, poruka } = this.props;

        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Процес</h1>
                    {
                        this.props.poruka ? <Poruka poruka={this.props.poruka} /> : <span/>
                    }
                    <ProcesForma proces={proces} />
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

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajProps): KreirajLinkStateProps => ({
    proces: state.procesReducer.proces,
    poruka: state.porukaReducer.poruka
});

export default connect(mapStateToProps)(Kreiraj);