import React, { Component } from "react";
import { IAktivnost } from "../store/proces/tipovi";
import { TIP_AKTIVNOSTI } from "../pomocnici/Konstante";

interface AktivnostCvorProps {
    aktivnosti: Array<IAktivnost>
}

type Props = AktivnostCvorProps;

export class AktivnostCvor extends Component<Props> {
    render() {
        return (
            <div className="aktivnost">
                <div className="lista-dokumenata lista-ulaz">
                    <p>Neki ulaz</p>
                </div>
                <div className="aktivnost-funkcionalnost">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z" />
                    </svg>
                </div>
                <div className="aktivnost-detalji">
                    <p>Изабери активност:</p>
                    <select className="input-tekst input-kreiraj input-aktivnost" name="izabrana-aktivnost">
                        {
                            this.props.aktivnosti.map(function (e, i) {
                                return <option value={i}>{e.naziv}</option>
                            })
                        }
                    </select>
                </div>
                <div className="aktivnost-funkcionalnost">
                    <svg className="remove-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                    </svg>
                    <svg className="document-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z" />
                    </svg>
                </div>
                <div className="lista-dokumenata lista-izlaz">
                    <p>Neki izlaz</p>
                </div>
            </div>
        )
    }
}