import React, { Component } from "react";
import { Proces } from "./Proces";

export class TokProstor extends Component {

    render() {
        return (
            <div className="tok-kontejner">
                <Proces pocetni={true}/>
            </div>
        )
    }
}