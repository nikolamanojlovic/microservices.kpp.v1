import React, { Component } from "react";
import { ProcesForma } from "./ProcesForma";
import { IProces } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import Proces from "./Proces";
import { Poruka } from "./Poruka";
import { IPoruka } from "../store/poruke/tipovi";

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
                { proces ? <h1 className="kreiraj-proces-h1">Ток процеса</h1> : <span/> }
                <Poruka poruka={this.props.poruka}/>
                { proces ? <div className="kreiraj-tok-proces"><Proces nadproces={undefined} proces={proces}/></div> : <span/> }
            </div>
        )
    }
}

interface KreirajLinkStateProps {
    proces?: IProces,
    poruka?: IPoruka
}

const mapStateToProps = (state: StanjeAplikacije, ownProps: KreirajProps): KreirajLinkStateProps => ({
    proces: state.procesReducer.proces,
    poruka: state.porukaReducer.poruka
});

export default connect(mapStateToProps)(Kreiraj);