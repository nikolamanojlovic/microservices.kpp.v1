import React, { Component } from "react";
import { ProcesForma } from "./ProcesForma";
import { IProces } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import Proces from "./Proces";
import { Poruka } from "./Poruka";
import { IPoruka } from "../store/poruke/tipovi";
import { OmoguciDodavanjeAktivnosti } from "../store/proces/akcije";

interface KreirajAktivnostProps {

}

type Props = KreirajAktivnostProps & KreirajAktivnostLinkStateProps;

class KreirajAktivnost extends Component<Props> {

    render() {
        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Активност</h1>

                </div>
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Улази и излази</h1>

                </div>
            </div>
        )
    }
}

interface KreirajAktivnostLinkStateProps {
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajAktivnostProps): KreirajAktivnostLinkStateProps => ({
});

export default connect(mapStateToProps)(KreirajAktivnost);