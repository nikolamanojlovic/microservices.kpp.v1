import React, { Component } from "react";
import { ProcesForma } from "./ProcesForma";
import { IProces } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import Proces from "./Proces";
import { Poruka } from "./Poruka";
import { IPoruka } from "../store/poruke/tipovi";
import { OmoguciDodavanjeAktivnosti } from "../store/proces/akcije";

interface KreirajProps {

}

type Props = KreirajProps & KreirajLinkStateProps;

class Kreiraj extends Component<Props> {

    _sacuvajTokProcesa() {
        OmoguciDodavanjeAktivnosti(false);
    }

    _renderujFunkcionalnosti() {
        let { proces, poruka } = this.props;
        let funkcionalnosti: Array<JSX.Element> = [];

        if ( proces ) {
            funkcionalnosti.push(
                <h1 className="kreiraj-proces-h1">Ток процеса</h1>
            );
            funkcionalnosti.push(
                poruka ? <Poruka poruka={this.props.poruka} /> : <div className="input-kreiraj-sacuvaj-tok"><input className="input-dugme" type="button" value="Сачувај ток процеса" onClick={() => this._sacuvajTokProcesa()}/></div>
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
        const { proces } = this.props;

        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Процес</h1>
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