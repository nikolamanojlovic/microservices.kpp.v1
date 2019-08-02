import React from "react";
import {ProcesForma} from "./ProcesForma";

export class Kreiraj extends React.Component {

    render() {
        return (
            <div className="kreiraj-kontejner">
                <div className="kreiraj-proces">
                    <h1 className="kreiraj-proces-h1">Процес</h1>
                    <ProcesForma/>
                </div>
                <div className="kreiraj-tok">
                    <h1 className="kreiraj-tok-h1">Ток процеса</h1>
                </div>
            </div>
        )
    }
}