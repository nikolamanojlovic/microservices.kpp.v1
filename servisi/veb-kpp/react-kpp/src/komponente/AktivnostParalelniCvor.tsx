import React, { Component } from "react";
import { IAktivnost } from "../store/proces/tipovi";
import { TIP_AKTIVNOSTI } from "../pomocnici/Konstante";
import { Tok } from "./Tok";
import { Aktivnost } from "./Aktivnost";

interface AktivnostCvorParalelniProps {
    aktivnosti: Array<IAktivnost>
}

interface AktivnostCvorParalelniStanje {
    brojTokova: number,
    tokovi: Array<JSX.Element>
}

type Props = AktivnostCvorParalelniProps;

export class AktivnostParalelniCvor extends Component<Props, AktivnostCvorParalelniStanje> {

    state: Readonly<AktivnostCvorParalelniStanje> = {
        brojTokova: 2,
        tokovi: [
            <Tok aktivnosti={this.props.aktivnosti} aktivnostiUToku={[<Aktivnost tip={TIP_AKTIVNOSTI[0]} aktivnosti={this.props.aktivnosti} />]} />,
            <Tok aktivnosti={this.props.aktivnosti} aktivnostiUToku={[<Aktivnost tip={TIP_AKTIVNOSTI[0]} aktivnosti={this.props.aktivnosti} />]} />
        ]
    };

    render() {
        return (
            <div className="aktivnost-paralelna">
                {
                    this.state.tokovi.map((e) => {
                        return (
                            <div className="tokovi">
                                <div className="tok-prostor-funkcionalnosti">
                                    <button className="input-dugme input-tok-prostor">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                                        </svg>
                                        <label>Секвенцијална</label>
                                    </button>
                                    <button className="input-dugme input-tok-prostor">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                                        </svg>
                                        <label>Паралелна</label>
                                    </button>
                                </div>
                                {e}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}