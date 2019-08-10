import React, { Component } from "react";
import { ProcesForma } from "./ProcesForma";
import { IProces } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import Proces from "./Proces";

interface KreirajProps {

}

type Props = KreirajProps & KreirajLinkStateProps;

class Kreiraj extends Component<Props> {

    render() {
        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Процес</h1>
                    <ProcesForma proces={this.props.proces}/>
                </div>
                {
                    this.props.proces ? <div className="kreiraj-tok-proces"><h1 className="kreiraj-proces-h1">Ток процеса</h1><Proces nadproces={true} proces={this.props.proces}/></div> : <span/>
                }
            </div>
        )
    }
}

interface KreirajLinkStateProps {
    proces?: IProces
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajProps): KreirajLinkStateProps => ({
    proces: state.procesReducer.proces
});

export default connect(mapStateToProps)(Kreiraj);