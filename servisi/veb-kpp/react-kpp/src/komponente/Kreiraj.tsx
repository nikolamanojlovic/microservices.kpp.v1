import React, { Component } from "react";
import { ProcesForma } from "./ProcesForma";
import TokProstor from "./TokProstor";
import { IProces } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";

interface KreirajProps {

}

type Props = KreirajProps & KreirajLinkStateProps;

class Kreiraj extends Component<Props> {

    _kreirajEditorZaTok() {
        console.log(this.props.proces)
        if (this.props.proces !== undefined) {
            return <div className="kreiraj-tok"><h1 className="kreiraj-tok-h1">Ток процеса</h1><TokProstor/></div>
        }
        return <span/>
    }

    render() {
        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Процес</h1>
                    <ProcesForma proces={this.props.proces}/>
                </div>
                { this._kreirajEditorZaTok() }
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