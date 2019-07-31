import React, { Component } from "react";
import { IKorisnik } from "../store/korisnik/tipovi";
import { StanjeAplikacije, AkcijeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import { Navigacija } from "../komponente/Navigacija";
import { Sadrzaj } from "../komponente/Sadrzaj";
import { bindActionCreators } from "redux";
import { PrijavaFunkcija, prijava } from "../store/korisnik/akcije";
import { ThunkDispatch } from "redux-thunk";

interface PocetnaProps {
}

interface PocetnaStanje {
}

type Props = PocetnaProps & PocetnaLinkStateProps;

class Pocetna extends Component<Props, PocetnaStanje> {
    render() {
        const { korisnik } = this.props;

        return (
            <div className="stranica-kontejner">
                <div className="sajt-kontejner">
                    <Navigacija korisnik={korisnik}/>
                    <Sadrzaj />
                </div>
                <div className="pozadina-kontejner"/>
            </div>
        );
    }
}

interface PocetnaLinkStateProps {
    korisnik?: IKorisnik
}

// ownProps - props koje je komponenta primila bez obzira na Redux
const mapStateToProps = (state: StanjeAplikacije, ownProps: PocetnaProps): PocetnaLinkStateProps => ({
    korisnik: state.korisnikReducer.korisnik
});
  
export default connect(mapStateToProps)(Pocetna);