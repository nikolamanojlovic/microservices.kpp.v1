import React, { Component } from "react";

interface AktivnostProps {
    //tip: string
}

type Props = AktivnostProps;

export class Aktivnost extends Component<Props> {

    render() {
        return (
            <div className="aktivnost-kontejner">
                <div className="aktivnost">

                </div>
                <div className="aktivnost-funkcionalnosti">
                    
                </div>
            </div>
        )
    }
}