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
        const {proces} = this.props;

        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Процес</h1>
                    <ProcesForma proces={proces}/>
                </div>
                {
                    proces ? <div className="kreiraj-tok-proces"><h1 className="kreiraj-proces-h1">Ток процеса</h1><Proces nadproces={true} proces={proces}/></div> : <span/>
                }
            </div>
        )
    }
}

interface KreirajLinkStateProps {
    proces?: IProces,
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajProps): KreirajLinkStateProps => ({
    proces: state.procesReducer.proces
});

export default connect(mapStateToProps)(Kreiraj);