import React, { Component } from "react";
import { TIP_PROCESA } from "../pomocnici/Konstante";

interface ProcesFormaProps {
}

interface ProcesFormaStanje {
    naziv: string,
    kategorija: string,
    opis: string
}

type Props = ProcesFormaProps;

export class ProcesForma extends Component<Props, ProcesFormaStanje> {

    render() {
        return (
            <form className="forma-proces">
                <div className="forma-proces-naziv-kategorija">
                    <label className="input-naziv-kategorija-opis">
                        <label>Назив процеса</label>
                        <input className="input-tekst" name="naziv" type="text" />
                    </label>
                    <label className="input-naziv-kategorija-opis">
                        <label>Категорија процеса</label>
                        <select className="input-tekst" name="kategorija">
                            {
                                TIP_PROCESA.map(function (e, i) {
                                    return <option value={i}>{e}</option>
                                })
                            }
                        </select>
                    </label>
                </div>
                <div className="forma-proces-opis">
                    <label className="input-naziv-kategorija-opis">
                        <label>Опис процеса</label>
                        <textarea className="input-tekst input-opis" name="opis" rows={4} cols={10} />
                    </label>
                </div>
            </form>
        )
    }
}

export default ProcesForma;
