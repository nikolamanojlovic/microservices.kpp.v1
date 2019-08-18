import React, { Component } from "react";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import { Poruka } from "./Poruka";
import { IPoruka } from "../store/poruke/tipovi";
import KreirajAktivnostForma from "./KreirajAktivnostForma";
import KreirajAktivnostFormaDokumenta from "./KreirajAktivnostFormaDokumenta";

interface KreirajAktivnostProps {

}

type Props = KreirajAktivnostProps & KreirajAktivnostLinkStateProps;

class KreirajAktivnost extends Component<Props> {

    render() {
        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Активност</h1>
                    <Poruka poruka={this.props.poruka} />
                    <KreirajAktivnostForma />
                </div>
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Улази и излази</h1>
                    <KreirajAktivnostFormaDokumenta />
                </div>
                <div className="input-sacuvaj-aktivnost">
                    <input className="input-dugme input-kreiraj-sacuvaj" type="button" value="Сачувај"/>
                </div>
            </div>
        )
    }
}

interface KreirajAktivnostLinkStateProps {
    poruka?: IPoruka
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajAktivnostProps): KreirajAktivnostLinkStateProps => ({
    poruka: state.porukaReducer.poruka
});

export default connect(mapStateToProps)(KreirajAktivnost);