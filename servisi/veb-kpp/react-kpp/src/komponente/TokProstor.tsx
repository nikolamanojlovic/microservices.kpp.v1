import React, { Component } from "react";
import { TIP_TOKA } from "../pomocnici/Konstante";

export class TokProstor extends Component {

    render() {
        return (
            <div className="tok-kontejner">
                <div className="tok-prostor">

                </div>
                <div className="tok-funkcije">
                    <div className="tok-funkcije-izbor">
                        <svg xmlns="http://www.w3.org/2000/svg" className="input-dodaj" width="23" height="23" viewBox="0 0 23 23">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                        <div className="tok-funkcije-meni">
                            <input className="input-dugme input-dugme-tok" type="button" value={TIP_TOKA[0]} />
                            <input className="input-dugme input-dugme-tok" type="button" value={TIP_TOKA[1]} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}