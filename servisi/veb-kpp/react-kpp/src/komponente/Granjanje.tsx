import React, { Component } from "react";
import { IAktivnost, IProces, ITok } from "../store/proces/tipovi";

interface GranjanjeProps {
    izgasiGranjanje?: () => void;
}

type Props = GranjanjeProps;

export class Granjanje extends Component<Props> {

    render() {
        return (
            <div className="granjanje-kontejner">
                <div className="granjanje-sadrzaj">
                    <div className="granjanje-funkcionalnosti">
                        <svg className="input" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                        </svg>
                        <svg className="input svg-obrisi" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={() => this.props.izgasiGranjanje!()}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                        </svg>
                    </div>
                    <div>
                        <label className="label-granjanje">Услов грањања процеса:</label>
                        <input className="input-tekst input-kreiraj input-granjanje" name="uslov" type="text" />
                    </div>
                </div>
            </div>
        )
    }
}