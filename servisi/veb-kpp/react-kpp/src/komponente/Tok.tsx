import React, { Component } from "react";
import { Aktivnost } from "./Aktivnost";
import { Proces } from "./Proces";
import { IAktivnost } from "../store/proces/tipovi";
import { TIP_AKTIVNOSTI } from "../pomocnici/Konstante";

interface TokProps {
    aktivnosti: Array<IAktivnost>
    aktivnostiUToku: Array<JSX.Element>
}

interface TokStanje {
    
}

type Props = TokProps;

export class Tok extends Component<Props, TokStanje> {

    render() {
        return (
            <div className="tok-kontejner">
                {
                    this.props.aktivnostiUToku
                }
            </div>
        )
    }
}