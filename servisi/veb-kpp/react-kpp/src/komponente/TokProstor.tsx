import React, { Component } from "react";
import { Proces } from "./Proces";
import { IAktivnost } from "../store/proces/tipovi";
import { StanjeAplikacije } from "../store/konfiguracija";
import { connect } from "react-redux";
import { VratiSveAktivnostiSistema } from "../store/proces/akcije";
import { Tok } from "./Tok";
import { Aktivnost } from "./Aktivnost";
import { TIP_AKTIVNOSTI } from "../pomocnici/Konstante";

interface TokProstorProps {

}

interface TokProstorStanje {
    aktivnostiUToku: Array<JSX.Element>
}

type Props = TokProstorProps & TokProstorLinkStateProps;

class TokProstor extends Component<Props, TokProstorStanje> {

    state: Readonly<TokProstorStanje> = {
        aktivnostiUToku: [<Aktivnost tip={TIP_AKTIVNOSTI[0]} aktivnosti={this.props.aktivnosti}/>]
    };

    UNSAFE_componentWillMount() {
        VratiSveAktivnostiSistema();
    }

    _dodajSekvencijalnuAktivnost() {
        const aktivnosti = this.state.aktivnostiUToku;
        aktivnosti.push(<Aktivnost tip={TIP_AKTIVNOSTI[2]} aktivnosti={this.props.aktivnosti}/>)
       
        this.setState({aktivnostiUToku: aktivnosti})
    }

    _dodajParalelnuAktivnost() {
        
    }

    render() {        
        return (
            <div className="tok-prostor">
                <div className="tok-prostor-funkcionalnosti">
                    <button className="input-dugme input-tok-prostor" onClick={() => this._dodajSekvencijalnuAktivnost()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                        <label>Секвенцијална активност</label>
                    </button>
                    <button className="input-dugme input-tok-prostor" onClick={() => this._dodajParalelnuAktivnost()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                        </svg>
                        <label>Паралелна активност</label>
                    </button>
                </div>
                <Tok aktivnosti={this.props.aktivnosti} aktivnostiUToku={this.state.aktivnostiUToku}/>
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