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
            <div className="forma-proces-div">
                <form className="forma-proces">
                    <div className="forma-proces-naziv-kategorija">
                        <label>Назив процеса
                            <input className="input-tekst" name="naziv" type="text"/>
                        </label>
                        <label>Категорија процеса
                            <select className="input-tekst" name="kategorija">
                                {
                                    TIP_PROCESA.map(function(e, i) {
                                        return <option value={i}>{e}</option>
                                    })
                                }
                            </select>
                        </label>
                    </div>
                    <div className="forma-proces-opis">
                        <label>Опис процеса
                            <textarea className="input-tekst" name="opis" rows={4} cols={50}/>
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProcesForma;
