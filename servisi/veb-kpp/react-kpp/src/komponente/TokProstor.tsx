import React, { Component } from "react";
import { Proces } from "./Proces";
import { IAktivnost } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import { VratiSveAktivnostiSistema } from "../store/proces/akcije";

interface TokProstorProps {
    
}

type Props = TokProstorProps & TokProstorLinkStateProps;

class TokProstor extends Component<Props> {
/*
    UNSAFE_componentWillMount() {
        VratiSveAktivnostiSistema();
    }*/

    render() {
        return (
            <div className="tok-kontejner">
                <Proces pocetni={true}/>
            </div>
        )
    }
}

interface TokProstorLinkStateProps {
    aktivnosti: Array<IAktivnost>
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: TokProstorProps): TokProstorLinkStateProps => ({
    aktivnosti: state.procesReducer.aktivnostiSistema
});
  
export default connect(mapStateToProps)(TokProstor);