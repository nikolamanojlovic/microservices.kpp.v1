import React, { Component } from "react";
import { ProcesForma } from "./ProcesForma";
import { IProces } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import Proces from "./Proces";
import { Poruka } from "./Poruka";
import { IPoruka } from "../store/poruke/tipovi";
import { OmoguciDodavanjeAktivnosti } from "../store/proces/akcije";

interface KreirajAktivnostFormaProps {

}

type Props = KreirajAktivnostFormaProps & KreirajAktivnostFormaLinkStateProps;

class KreirajAktivnostForma extends Component<Props> {

    render() {
        return (
            <div className="kreiraj-aktivnost-forma">
                <label className="label-kreiraj">Назив активности:</label>
                <input className="input-tekst input-kreiraj input-kreiraj-aktivnost" name="naziv" type="text" />
                <label className="label-kreiraj label-kreiraj-opis">Опис процеса:</label>
                <textarea className="input-tekst input-kreiraj input-opis input-kreiraj-aktivnost" name="opis" rows={4} cols={3} />
            </div>
        )
    }
}

interface KreirajAktivnostFormaLinkStateProps {
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajAktivnostFormaProps): KreirajAktivnostFormaLinkStateProps => ({
});

export default connect(mapStateToProps)(KreirajAktivnostForma);