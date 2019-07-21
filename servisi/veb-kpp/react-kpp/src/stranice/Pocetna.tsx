import React, { Component } from "react";
import { IKorisnik } from "../store/korisnik/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";

interface PocetnaProps {
}

interface PocetnaStanje {
}

type Props = PocetnaProps & PocetnaLinkDispatchProps & PocetnaLinkStateProps;

export class Pocetna extends Component<Props, PocetnaStanje> {    
    render() {
        return <p>Hello</p>
    }
}

interface PocetnaLinkStateProps {
    korisnik?: IKorisnik
}

interface PocetnaLinkDispatchProps {

}

// ownProps - props koje je komponenta primila bez obzira na Redux
const mapStateToProps = (state: StanjeAplikacije, ownProps: PocetnaProps): PocetnaLinkStateProps => ({
    korisnik: state.korisnikReducer.korisnik
});

const mapDispatchToProps = (): PocetnaLinkDispatchProps => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Pocetna);