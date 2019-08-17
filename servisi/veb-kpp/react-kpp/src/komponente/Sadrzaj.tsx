import React, { Component } from "react";
import { IKorisnik } from "../store/korisnik/tipovi";
import { Naslovna } from "./Naslovna";
import Kreiraj from "./Kreiraj";
import KreirajAktivnost from "./KreirajAktivnost";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import { STRANICE } from "../pomocnici/Konstante";

interface SadrzajProps {
    korisnik?: IKorisnik
}

type Props = SadrzajProps & SadrzajLinkStateProps;

class Sadrzaj extends Component<Props> {

    _vratiStranicu() {
        switch (this.props.stranica) {
            case STRANICE[3]:
                return <Kreiraj />
            case STRANICE[2]:
                return <KreirajAktivnost />
            default:
                return <Kreiraj />
        }
    }

    render() {
        const { korisnik } = this.props;

        return (
            <div className="sadrzaj-kontejner">
                {korisnik ? this._vratiStranicu() : <Naslovna />}
            </div>
        )
    }
}

interface SadrzajLinkStateProps {
    stranica: string
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: SadrzajProps): SadrzajLinkStateProps => ({
    stranica: state.korisnikReducer.strana
});

export default connect(mapStateToProps)(Sadrzaj);