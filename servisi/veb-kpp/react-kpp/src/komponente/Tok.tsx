import React, { Component } from "react";
import { Aktivnost } from "./Aktivnost";
import { Proces } from "./Proces";
import { IAktivnost } from "../store/proces/tipovi";
import { TIP_AKTIVNOSTI } from "../pomocnici/Konstante";

interface TokProps {
    aktivnosti: Array<IAktivnost>
}

interface TokStanje {
    aktivnostiUToku: Array<JSX.Element>
}

type Props = TokProps;

export class Tok extends Component<Props, TokStanje> {

    state: Readonly<TokStanje> = {
        aktivnostiUToku: [<Aktivnost tip={TIP_AKTIVNOSTI[0]} aktivnosti={this.props.aktivnosti}/>]
    };

    render() {
        return (
            <div className="tok-kontejner">
                {
                    this.state.aktivnostiUToku
                }
            </div>
        )
    }
}