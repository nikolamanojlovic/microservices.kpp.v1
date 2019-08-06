import React, { Component } from "react";
import { Tok } from "./Tok";

interface ProcesProps {
    pocetni: boolean,
}

interface ProcesStanje {
    brojTokova: number,
    tokovi: Array<JSX.Element>
}

type Props = ProcesProps;

export class Proces extends Component<Props, ProcesStanje> {

    state: Readonly<ProcesStanje> = {
        brojTokova: this.props.pocetni ? 1 : 2,
        tokovi: []
    };

    _kreirajTokove() {
        for (let i = 0; i < this.state.brojTokova; i++) {
            this.state.tokovi.push(<Tok/>)
        }
    }

    render() {
        return (
            <div className="proces-kontejner">
                <div className="proces">
                    {
                        this.state.tokovi.map((e,i) => {
                            return e;
                        })
                    }
                </div>
                {
                    this.props.pocetni ? <span /> :
                        <div className="proces-funkcionalnosti">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                            </svg>
                        </div>
                }
            </div>
        )
    }
}